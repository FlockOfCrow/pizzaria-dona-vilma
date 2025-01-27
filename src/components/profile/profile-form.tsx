"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Pizza } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { set, z } from "zod";
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
import PizzaLoading from "../loading/pizza-loading";
import { toast } from "sonner";

export const formSchema = z
  .object({
    id: z.string(),
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
    password: z
      .string()
      .min(6, {
        message: "Senha inválida",
      })
      .optional(),
    newPassword: z
      .string()
      .min(6, {
        message: "Senha inválida",
      })
      .optional(),
    confirmNewPassword: z
      .string()
      .min(6, {
        message: "Senha inválida",
      })
      .optional(),
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
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "As senhas não coincidem",
    path: ["confirmNewPassword"],
  })
  .refine(
    (data) =>
      (!data.newPassword && !data.confirmNewPassword) ||
      (data.password && data.newPassword && data.confirmNewPassword),
    {
      message:
        "Você precisa inserir a senha antiga, a nova senha e confirmar a nova senha juntas",
      path: ["password", "newPassword", "confirmNewPassword"],
    }
  );

export default function ProfileForm() {
  const router = useRouter();

  const [isLoading, setLoading] = useState(true);
  const [isSubmitting, setSubmit] = useState(false);
  const [isAutoFilled, setIsAutoFilled] = useState({
    street: false,
    city: false,
    state: false,
    neighborhood: false,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: "",
      email: "",
      name: "",
      password: "",
      newPassword: "",
      confirmNewPassword: "",
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

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/user");
        const data = await response.json();
        if (!data) return router.push("/login");
        form.reset({
          id: data.user.id,
          email: data.user.email || "",
          name: data.user.name || "",
          address: {
            street: data.user.address.street || "",
            city: data.user.address.city || "",
            state: data.user.address.state || "",
            neighborhood: data.user.address.neighborhood || "",
            zip: data.user.address.zip || "",
            number: data.user.address.number || "",
            country: data.user.address.country || "Brasil",
          },
        });
      } catch (error) {
        console.error("Erro ao buscar os dados do usuário:", error);
        return router.push("/login");
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [form, router]);

  const formatZip = (value: string) => {
    return value.replace(/^(\d{5})(\d)/, "$1-$2");
  };

  const handleZipChange = async (zip: string) => {
    if (zip.length === 9) {
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
        }
      } catch (error) {
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
    const { confirmNewPassword, ...filteredValues } = values;
    const updatePromise = fetch("/api/user", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(filteredValues),
    }).then(async (res) => {
      const json = await res.json();
      if (!res.ok) {
        const resp = {
          message: json?.message || "Erro ao salvar alterações do usuário.",
          status: res.status,
        };
        throw new Error(JSON.stringify(resp));
      }

      setSubmit(false);
      return json;
    });
    toast.promise(updatePromise, {
      loading: "Salvando alterações...",
      success: "Alterações salva com sucesso!",
      error: (err) => {
        setSubmit(false);
        const parse = JSON.parse(err.message);
        switch (parse.status) {
          case 429:
            return "Aguarde para atualizar seu perfil novamente.";
          case 401:
            router.push("/login");
            return parse.message;
          default:
            return "Erro ao salvar alterações do usuário.";
        }
      },
    });
  }

  if (isLoading) return <PizzaLoading />;

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
                  className="bg-fbg border-2 border-border-pizza shadow-md"
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
                  className="bg-fbg border-2 border-border-pizza shadow-md"
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
              <FormLabel>Senha antiga</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  className="bg-fbg border-2 border-border-pizza shadow-md"
                  placeholder="Sua senha antiga"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-5">
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha nova</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    className="bg-fbg border-2 border-border-pizza shadow-md"
                    placeholder="Sua senha nova"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmNewPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirme senha</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    className="bg-fbg border-2 border-border-pizza shadow-md"
                    placeholder="Novamente sua senha nova"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
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
                    className="bg-fbg border-2 border-border-pizza shadow-md"
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
                    className="bg-fbg border-2 border-border-pizza shadow-md"
                    placeholder="Ex: São Paulo"
                    {...field}
                    readOnly={isAutoFilled.city}
                    disabled={isAutoFilled.city}
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
                    className="bg-fbg border-2 border-border-pizza shadow-md"
                    placeholder="Ex: Centro"
                    {...field}
                    readOnly={isAutoFilled.neighborhood}
                    disabled={isAutoFilled.neighborhood}
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
                    className="bg-fbg border-2 border-border-pizza shadow-md"
                    placeholder="Ex: São Paulo"
                    {...field}
                    readOnly={isAutoFilled.state}
                    disabled={isAutoFilled.state}
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
                    className="bg-fbg border-2 border-border-pizza shadow-md"
                    placeholder="Ex: Avenida 9 de Julho"
                    {...field}
                    readOnly={isAutoFilled.street}
                    disabled={isAutoFilled.street}
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
                    className="bg-fbg border-2 border-border-pizza shadow-md"
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
            className="bg-button-pizza hover:bg-button-hover-pizza w-1/3 shadow-lg"
            type="submit"
            disabled={isSubmitting}
          >
            Salvar
            <Pizza className="flex items-end justify-end text-end" />
          </Button>
        </div>
      </form>
    </Form>
  );
}
