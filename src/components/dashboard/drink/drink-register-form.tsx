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
import Image from "next/image";
import { toast } from "sonner";
import { registerDrinkSchema } from "../../../../@types/drink";
import { DrinkSize } from "../../../../@types/types";

type RegisterDrinkFormData = z.infer<typeof registerDrinkSchema>;

export default function DrinkRegisterForm() {
  const [image, setImage] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<RegisterDrinkFormData>({
    resolver: zodResolver(registerDrinkSchema),
    defaultValues: {
      picture: null as unknown as File,
      name: "",
      description: "",
      price: {
        Lata: "" as unknown as number,
        "1L": "" as unknown as number,
        "2L": "" as unknown as number,
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
    onChange: (file: File | null) => void
  ) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setImage(URL.createObjectURL(file));
      onChange(file);
    } else {
      setImage(null);
      onChange(null);
    }
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

  async function onSubmit(values: z.infer<typeof registerDrinkSchema>) {
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("price", JSON.stringify(values.price));
    formData.append("picture", values.picture as File);
    const registerPromise = fetch("/api/drink", {
      method: "POST",
      body: formData,
    });
    toast.promise(registerPromise, {
      loading: "Cadastrando sua bebida...",
      success: () => {
        setIsSubmitting(false);
        form.reset();
        setImage(null);
        setDragActive(false);
        return "Bebida cadastrada com sucesso!";
      },
      error: async (error) => {
        setIsSubmitting(false);
        return "Erro ao cadastrar bebida.";
      },
    });
  }

  const handleNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    size: DrinkSize
  ) => {
    let { value } = event.target;
    value = value.replace(/,/g, ".");
    value = value.replace(/[^0-9.]/g, "");
    const parts = value.split(".");
    if (parts.length > 2) {
      value = parts.shift() + "." + parts.join("");
    }
    form.setValue(`price.${size}`, value as unknown as number, {
      shouldValidate: true,
    });
  };

  const handleNumberBlur = (
    event: React.FocusEvent<HTMLInputElement>,
    size: DrinkSize
  ) => {
    let value = event.target.value;
    if (value.endsWith(".")) {
      value = value.slice(0, -1);
    }
    const numberValue = parseFloat(value);
    if (!isNaN(numberValue)) {
      const formatted = numberValue.toFixed(2);
      form.setValue(`price.${size}`, formatted as unknown as number, {
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
                        <Image
                          src={image}
                          alt="Bebida"
                          fill={true}
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
                  <FormLabel>Nome da Bebida</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-fbg border-border-pizza shadow-md"
                      placeholder="Insira aqui o nome da Bebida"
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
                  <FormLabel>Descrição da Bebida</FormLabel>
                  <FormControl>
                    <Textarea
                      className="bg-fbg border-border-pizza shadow-md h-52 resize-none"
                      placeholder="Insira aqui a descrição da Bebida"
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
              name="price.Lata"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tamanho Lata</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      inputMode="decimal"
                      placeholder="Ex: 49.99"
                      {...field}
                      onChange={(e) => handleNumberChange(e, "Lata")}
                      onBlur={(e) => handleNumberBlur(e, "Lata")}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price.1L"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tamanho 1 Litro</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      inputMode="decimal"
                      placeholder="Ex: 59.99"
                      {...field}
                      onChange={(e) => handleNumberChange(e, "1L")}
                      onBlur={(e) => handleNumberBlur(e, "1L")}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price.2L"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tamanho 2 Litros</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      inputMode="decimal"
                      placeholder="Ex: 69.99"
                      {...field}
                      onChange={(e) => handleNumberChange(e, "2L")}
                      onBlur={(e) => handleNumberBlur(e, "2L")}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <Button type="submit" disabled={isSubmitting}>
          Registrar Bebida
        </Button>
      </form>
    </Form>
  );
}
