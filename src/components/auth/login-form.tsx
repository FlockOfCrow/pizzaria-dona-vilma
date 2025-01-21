"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Pizza } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import Link from "next/link";

const formSchema = z.object({
  email: z
    .string()
    .email({
      message: "Email inválido",
    })
    .min(4, {
      message: "Email inválido",
    }),
  password: z.string().min(6, {
    message: "Senha inválida",
  }),
});

export default function LoginForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
              <FormDescription className="text-black hover:text-orange-pizza hover:underline transition duration-100">
                <Link href={"/password_reset"}>Esqueci minha senha</Link>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button
            className="bg-button-pizza hover:bg-[#9c6e1e] w-1/3"
            type="submit"
          >
            Entrar
            <Pizza className="flex items-end justify-end text-end" />
          </Button>
        </div>
      </form>
    </Form>
  );
}
