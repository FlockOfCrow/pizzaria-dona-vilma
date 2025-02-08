import { z } from "zod";

export const totalUserQuerySchema = z.object({
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

export const userQuerySchema = z.object({
  limit: z.number().int().positive(),
  page: z.number().int(),
  search: z.string().optional(),
});

export const userQuerySchemaWithUserId = userQuerySchema.extend({
  userId: z.string(),
});
