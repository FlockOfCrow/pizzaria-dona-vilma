"use server";

import { formSchema as loginFormSchema } from "@/components/auth/login-form";
import { formSchema as registerFormSchema } from "@/components/auth/register-form";
import prisma from "@/lib/prisma";
import { z } from "zod";
import { comparePassword } from "./auth-service";

export async function registerUser(
  formData: Omit<z.infer<typeof registerFormSchema>, "confirmPassword">
) {
  try {
    await prisma.user.create({
      data: {
        email: formData.email,
        name: formData.name,
        password: formData.password,
        address: {
          city: formData.address.city,
          street: formData.address.street,
          zip: formData.address.zip,
          neighborhood: formData.address.neighborhood,
          number: formData.address.number,
          country: formData.address.country || "Brasil",
          state: formData.address.state,
        },
      },
    });
    return { status: "success" };
  } catch (error: any) {
    console.log(error.message);
    if (error.code === "P2002") {
      throw new Error("Esse email já está cadastrado.");
    } else {
      console.error("Erro ao cadastrar usuário:", error);
      throw new Error("Erro ao cadastrar usuário.");
    }
  }
}

export async function loginUser(formData: z.infer<typeof loginFormSchema>) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: formData.email,
      },
    });
    if (!user) {
      throw new Error("Email ou senha inválidos.");
    }
    const confirmPassword = await comparePassword(
      formData.password,
      user.password
    );
    if (!confirmPassword) {
      throw new Error("Email ou senha inválidos.");
    }
    return { status: "success" };
  } catch (error: any) {
    console.error(error.message);
    throw new Error("Email ou senha inválidos.");
  }
}
