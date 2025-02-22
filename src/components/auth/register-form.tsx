"use client";

import { registerUser } from "@/modules/auth/auth-action";
import { cryptoPassword } from "@/modules/auth/auth-service";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pizza } from "lucide-react";
import { useState } from "react";
import { set, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const formSchema = z
  .object({
    email: z
      .string()
      .email({
        message: "Email inválido",
      })
      .min(4, {
        message: "Email inválido",
      }),
    name: z
      .string()
      .min(12, {
        message: "Nome inválido",
      })
      .max(255, {
        message: "Nome inválido",
      }),
    password: z.string().min(6, {
      message: "Senha inválida",
    }),
    confirmPassword: z.string().min(6, {
      message: "Senha inválida",
    }),
    address: z.object({
      street: z.string().min(1, {
        message: "Rua inválida",
      }),
      number: z.string().regex(/^[0-9A-Za-z]{1,10}$/, {
        message: "Número inválido",
      }),
      city: z.string().min(1, {
        message: "Cidade inválida",
      }),
      state: z.string().min(1, {
        message: "Estado inválido",
      }),
      neighborhood: z.string().min(1, {
        message: "Bairro inválido",
      }),
      zip: z.string().regex(/^\d{5}-\d{3}$/, {
        message: "CEP inválido",
      }),
      country: z
        .string()
        .min(1, {
          message: "País inválido",
        })
        .optional(),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export default function RegisterForm() {
  const router = useRouter();

  const [isSubmitting, setSubmit] = useState(false);
  const [isAutoFilled, setIsAutoFilled] = useState({
    street: false,
    city: false,
    state: false,
    neighborhood: false,
  });
  const [isLoadingCEP, setIsLoadingCEP] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      address: {
        street: "",
        city: "",
        state: "",
        neighborhood: "",
        zip: "",
        number: "",
        country: "Brasil",
      },
    },
  });

  const formatZip = (value: string) => {
    return value.replace(/^(\d{5})(\d)/, "$1-$2");
  };

  const handleZipChange = async (zip: string) => {
    if (zip.length === 9) {
      setIsLoadingCEP(true);
      try {
        const response = await fetch(
          `https://brasilapi.com.br/api/cep/v2/${zip}`
        );
        const data = await response.json();
        if (!data.erro) {
          form.setValue("address.street", data.street || "");
          form.setValue("address.city", data.city || "");
          form.setValue("address.state", data.state || "");
          form.setValue("address.neighborhood", data.neighborhood || "");
          form.setValue("address.country", "Brasil");
          setIsAutoFilled({
            street: !!data.street,
            city: !!data.city,
            state: !!data.state,
            neighborhood: !!data.neighborhood,
          });
          setIsLoadingCEP(false);
        }
      } catch (error) {
        setIsLoadingCEP(false);
        console.error("Erro ao buscar o endereço:", error);
      }
    } else if (zip.length == 0) {
      setIsAutoFilled({
        street: false,
        city: false,
        state: false,
        neighborhood: false,
      });
      form.setValue("address.street", "");
      form.setValue("address.city", "");
      form.setValue("address.state", "");
      form.setValue("address.neighborhood", "");
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setSubmit(true);
    const { confirmPassword, ...filteredValues } = values;
    const registerPromise = registerUser({
      ...filteredValues,
    });
    toast.promise(registerPromise, {
      loading: "Criando sua conta...",
      success: "Conta criada com sucesso!",
      error: () => {
        setSubmit(false);
        return "Erro ao cadastrar usuário.";
      },
    });
    try {
      await registerPromise;
      router.push("/login");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome completo</FormLabel>
              <FormControl>
                <Input
                  className="bg-bg"
                  placeholder="Seu nome"
                  type="text"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  className="bg-bg"
                  placeholder="email@exemplo.com"
                  type="email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  className="bg-bg"
                  placeholder="Sua senha"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirme sua senha</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  className="bg-bg"
                  placeholder="Novamente sua senha"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-3 gap-6">
          <FormField
            control={form.control}
            name="address.zip"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CEP</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    className="bg-bg"
                    placeholder="Ex: 31234-123"
                    {...field}
                    onChange={(e) => {
                      const formattedValue = formatZip(e.target.value);
                      field.onChange(formattedValue);
                      handleZipChange(formattedValue);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address.city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cidade</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    className="bg-bg"
                    placeholder="Ex: São Paulo"
                    {...field}
                    readOnly={isAutoFilled.city || isLoadingCEP}
                    disabled={isAutoFilled.city || isLoadingCEP}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address.neighborhood"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bairro</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    className="bg-bg"
                    placeholder="Ex: Centro"
                    {...field}
                    readOnly={isAutoFilled.neighborhood || isLoadingCEP}
                    disabled={isAutoFilled.neighborhood || isLoadingCEP}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address.state"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estado</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    className="bg-bg"
                    placeholder="Ex: São Paulo"
                    {...field}
                    readOnly={isAutoFilled.state || isLoadingCEP}
                    disabled={isAutoFilled.state || isLoadingCEP}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address.street"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rua</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    className="bg-bg"
                    placeholder="Ex: Avenida 9 de Julho"
                    {...field}
                    readOnly={isAutoFilled.street || isLoadingCEP}
                    disabled={isAutoFilled.street || isLoadingCEP}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address.number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Número</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    className="bg-bg"
                    placeholder="Ex: 31"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-end">
          <Button
            className="bg-button-pizza hover:bg-button-hover-pizza w-1/3"
            type="submit"
            disabled={isSubmitting}
          >
            Registrar
            <Pizza className="flex items-end justify-end text-end" />
          </Button>
        </div>
      </form>
    </Form>
  );
}
