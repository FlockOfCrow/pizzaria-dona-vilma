import { z } from "zod";

export const monthQuerySchema = z.object({
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

export const querySchema = z.object({
  limit: z.number().int().positive(),
  page: z.number().int(),
  search: z.string().optional(),
});

export const searchSchema = z.object({
  search: z.string(),
});

export const userQuerySchemaWithUserId = querySchema.extend({
  userId: z.string(),
});
