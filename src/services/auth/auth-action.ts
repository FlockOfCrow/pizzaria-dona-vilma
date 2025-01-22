"use server";

import { formSchema as loginFormSchema } from "@/components/auth/login-form";
import { formSchema as registerFormSchema } from "@/components/auth/register-form";
import { z } from "zod";

export async function registerUser(
  formData: Omit<z.infer<typeof registerFormSchema>, "confirmPassword">
) {
  try {
    // Register user
    console.log("formData", formData);
    return true;
  } catch (_) {
    throw new Error("Register failed");
  }
}

export async function loginUser(formData: z.infer<typeof loginFormSchema>) {
  try {
    console.log("formData", formData);
    return true;
  } catch (_) {
    throw new Error("Login failed");
  }
}
