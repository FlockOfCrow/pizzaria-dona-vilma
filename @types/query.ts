import { z } from "zod";

export const dateQuerySchema = z.object({
  month: z
    .string()
    .regex(/^(0?[1-9]|1[0-2])$/, "O mês deve estar entre 1 e 12"),
  year: z
    .string()
    .optional()
    .refine((val) => !val || /^\d{4}$/.test(val), {
      message: "Ano deve ser um ano válido com 4 dígitos",
    }),
});

export type IDateQuerySchema = z.infer<typeof dateQuerySchema>;
