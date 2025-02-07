import { z } from "zod";

export const registerDrinkSchema = z.object({
  picture: z
    .custom<File>(
      (val) =>
        val instanceof File ||
        (val instanceof Blob &&
          typeof (val as any).arrayBuffer === "function" &&
          "name" in val),
      { message: "A imagem deve ser um arquivo válido" }
    )
    .refine(
      (file) => ["image/jpeg", "image/png"].includes((file as File).type),
      { message: "Apenas arquivos JPEG e PNG são permitidos" }
    ),
  name: z.string().nonempty({ message: "O nome da bebida é obrigatório" }),
  description: z.string().nonempty({
    message: "A descrição da bebida é obrigatória",
  }),
  price: z.object({
    Lata: z.preprocess(
      (val) => (typeof val === "string" ? parseFloat(val) : val),
      z.number().positive({ message: "O preço deve ser um valor positivo" })
    ),
    "1L": z.preprocess(
      (val) => (typeof val === "string" ? parseFloat(val) : val),
      z.number().positive({ message: "O preço deve ser um valor positivo" })
    ),
    "2L": z.preprocess(
      (val) => (typeof val === "string" ? parseFloat(val) : val),
      z.number().positive({ message: "O preço deve ser um valor positivo" })
    ),
  }),
});
