"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Upload } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PizzaSize } from "../../../../@types/types";

const registerPizzaSchema = z.object({
  picture: z
    .any()
    .refine(
      (files) => {
        if (typeof FileList !== "undefined" && files instanceof FileList) {
          return files.length > 0;
        }
        return false;
      },
      { message: "Você deve selecionar uma imagem" }
    )
    .refine(
      (files) => {
        if (typeof FileList !== "undefined" && files instanceof FileList) {
          const file = files.item(0);
          return file ? ["image/jpeg", "image/png"].includes(file.type) : false;
        }
        return false;
      },
      { message: "Apenas arquivos JPEG e PNG são permitidos" }
    ),
  name: z.string().nonempty({ message: "O nome da pizza é obrigatório" }),
  description: z.string().nonempty({
    message: "A descrição da pizza é obrigatória",
  }),
  prices: z.object({
    P: z
      .string()
      .refine((val) => /^\d+(\.\d{2})?$/.test(val), {
        message:
          "O preço deve ser um número válido com duas casas decimais (use . como separador)",
      })
      .transform((val) => parseFloat(val))
      .refine((val) => val > 0, {
        message: "O preço deve ser um valor positivo",
      }),
    M: z
      .string()
      .refine((val) => /^\d+(\.\d{2})?$/.test(val), {
        message:
          "O preço deve ser um número válido com duas casas decimais (use . como separador)",
      })
      .transform((val) => parseFloat(val))
      .refine((val) => val > 0, {
        message: "O preço deve ser um valor positivo",
      }),
    G: z
      .string()
      .refine((val) => /^\d+(\.\d{2})?$/.test(val), {
        message:
          "O preço deve ser um número válido com duas casas decimais (use . como separador)",
      })
      .transform((val) => parseFloat(val))
      .refine((val) => val > 0, {
        message: "O preço deve ser um valor positivo",
      }),
    GG: z
      .string()
      .refine((val) => /^\d+(\.\d{2})?$/.test(val), {
        message:
          "O preço deve ser um número válido com duas casas decimais (use . como separador)",
      })
      .transform((val) => parseFloat(val))
      .refine((val) => val > 0, {
        message: "O preço deve ser um valor positivo",
      }),
  }),
});

type RegisterPizzaFormData = z.infer<typeof registerPizzaSchema>;

export default function PizzaRegisterForm() {
  const [image, setImage] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const form = useForm<RegisterPizzaFormData>({
    resolver: zodResolver(registerPizzaSchema),
    defaultValues: {
      picture: undefined,
      name: "",
      description: "",
      prices: {
        P: undefined,
        M: undefined,
        G: undefined,
        GG: undefined,
      },
    },
  });

  const validImageTypes = ["image/jpeg", "image/png"];

  const handleFiles = (files: FileList | null) => {
    if (files && files.length > 0) {
      const file = files[0];
      if (!validImageTypes.includes(file.type)) {
        setImage(null);
        return;
      }
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    } else {
      setImage(null);
    }
  };

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    onChange: (files: FileList | null) => void
  ) => {
    handleFiles(event.target.files);
    onChange(event.target.files);
  };

  const handleDragEnter = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleDrop = (
    event: React.DragEvent<HTMLLabelElement>,
    onChange: (files: FileList | null) => void
  ) => {
    event.preventDefault();
    setDragActive(false);
    const files = event.dataTransfer.files;
    handleFiles(files);
    onChange(files);
  };

  const onSubmit = async (data: RegisterPizzaFormData) => {
    const formData = new FormData();
    formData.append("picture", data.picture[0]);
    try {
      const response = await fetch("/upload", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Erro ao enviar o arquivo");
      }
      console.log("Arquivo enviado com sucesso");
    } catch (error) {
      console.error(error);
    }
  };

  const handleNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    size: PizzaSize
  ) => {
    let { value } = event.target;
    value = value.replace(/,/g, ".");
    value = value.replace(/[^0-9.]/g, "");
    const parts = value.split(".");
    if (parts.length > 2) {
      value = parts.shift() + "." + parts.join("");
    }
    form.setValue(`prices.${size}`, value as unknown as number, {
      shouldValidate: true,
    });
  };

  const handleNumberBlur = (
    event: React.FocusEvent<HTMLInputElement>,
    size: PizzaSize
  ) => {
    let value = event.target.value;
    if (value.endsWith(".")) {
      value = value.slice(0, -1);
    }
    const numberValue = parseFloat(value);
    if (!isNaN(numberValue)) {
      const formatted = numberValue.toFixed(2);
      form.setValue(`prices.${size}`, formatted as unknown as number, {
        shouldValidate: true,
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="pt-8 grid grid-cols-1 md:grid-cols-2 md:gap-8 gap-4">
          <FormField
            control={form.control}
            name="picture"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <FormLabel
                    htmlFor="picture"
                    onDragEnter={handleDragEnter}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, field.onChange)}
                    className={`relative cursor-pointer flex flex-col items-center gap-2 bg-fbg rounded-md border-2 border-dashed ${
                      dragActive
                        ? "border-blue-500 animate-pulse"
                        : "border-border-pizza"
                    } aspect-square md:w-80 w-full shadow-lg justify-center transition-all duration-300 text-black`}
                  >
                    {image ? (
                      <div className="relative w-full h-full">
                        <img
                          src={image}
                          alt="Pizza"
                          className="w-full h-full object-cover rounded-md"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-md">
                          <span className="text-white">Trocar imagem</span>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center space-y-2">
                        <span className="text-center">
                          Inserir uma imagem ou
                          <br />
                          <strong>Arraste a imagem aqui</strong>
                        </span>
                        <Upload className="text-4xl" />
                      </div>
                    )}
                    <Input
                      id="picture"
                      type="file"
                      accept="image/png,image/jpeg"
                      className="hidden"
                      ref={field.ref}
                      onChange={(e) => handleImageChange(e, field.onChange)}
                    />
                  </FormLabel>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="space-y-4 relative">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do Produto</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-fbg border-border-pizza shadow-md"
                      placeholder="Insira aqui o nome do Produto"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição do Produto</FormLabel>
                  <FormControl>
                    <Textarea
                      className="bg-fbg border-border-pizza shadow-md h-52 resize-none"
                      placeholder="Insira aqui a descrição do Produto"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="prices.P"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tamanho P</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      inputMode="decimal"
                      placeholder="Ex: 49.99"
                      {...field}
                      onChange={(e) => handleNumberChange(e, "P")}
                      onBlur={(e) => handleNumberBlur(e, "P")}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="prices.M"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tamanho M</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      inputMode="decimal"
                      placeholder="Ex: 59.99"
                      {...field}
                      onChange={(e) => handleNumberChange(e, "M")}
                      onBlur={(e) => handleNumberBlur(e, "M")}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="prices.G"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tamanho G</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      inputMode="decimal"
                      placeholder="Ex: 69.99"
                      {...field}
                      onChange={(e) => handleNumberChange(e, "G")}
                      onBlur={(e) => handleNumberBlur(e, "G")}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="prices.GG"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tamanho GG</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      inputMode="decimal"
                      placeholder="Ex: 79.99"
                      {...field}
                      onChange={(e) => handleNumberChange(e, "GG")}
                      onBlur={(e) => handleNumberBlur(e, "GG")}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <Button type="submit">Registrar Pizza</Button>
      </form>
    </Form>
  );
}
