import { z } from "zod";

export const registerPizzaSchema = z.object({
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
  name: z.string().nonempty({ message: "O nome da pizza é obrigatório" }),
  description: z.string().nonempty({
    message: "A descrição da pizza é obrigatória",
  }),
  price: z.object({
    P: z.preprocess(
      (val) => (typeof val === "string" ? parseFloat(val) : val),
      z.number().positive({ message: "O preço deve ser um valor positivo" })
    ),
    M: z.preprocess(
      (val) => (typeof val === "string" ? parseFloat(val) : val),
      z.number().positive({ message: "O preço deve ser um valor positivo" })
    ),
    G: z.preprocess(
      (val) => (typeof val === "string" ? parseFloat(val) : val),
      z.number().positive({ message: "O preço deve ser um valor positivo" })
    ),
    GG: z.preprocess(
      (val) => (typeof val === "string" ? parseFloat(val) : val),
      z.number().positive({ message: "O preço deve ser um valor positivo" })
    ),
  }),
});
