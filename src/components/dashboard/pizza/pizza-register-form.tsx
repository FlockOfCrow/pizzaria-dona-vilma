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
});

type RegisterPizzaFormData = z.infer<typeof registerPizzaSchema>;

export default function PizzaRegisterForm() {
  const [image, setImage] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const form = useForm<RegisterPizzaFormData>({
    resolver: zodResolver(registerPizzaSchema),
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

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(event.target.files);
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="pt-8 grid grid-cols-1 md:grid-cols-2 md:gap-8 gap-4">
          <FormField
            control={form.control}
            name="picture"
            render={({ field, fieldState }) => (
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
                      <div className="flex flex-col items-center">
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
                      onChange={(e) => {
                        handleImageChange(e);
                        field.onChange(e.target.files);
                      }}
                    />
                  </FormLabel>
                </FormControl>
                <FormMessage>{fieldState.error?.message}</FormMessage>
              </FormItem>
            )}
          />
        </div>
        <Button
          type="submit"
          className="mt-4 bg-orange-pizza text-white py-2 px-4 rounded-md"
        >
          Enviar
        </Button>
      </form>
    </Form>
  );
}
