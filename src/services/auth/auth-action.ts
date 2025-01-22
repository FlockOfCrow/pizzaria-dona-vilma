"use server";

import { formSchema } from "@/components/auth/register-form";
import { z } from "zod";

export async function registerUser(
  formData: Omit<z.infer<typeof formSchema>, "confirmPassword">
) {
  try {
    // Register user
    console.log("formData", formData);
    return true;
  } catch (_) {
    return false;
  }
}
