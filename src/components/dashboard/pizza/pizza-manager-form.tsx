"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil, Upload } from "lucide-react";
import { useEffect, useState } from "react";
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
import { Product } from "@prisma/client";
import Image from "next/image";
import { toast } from "sonner";
import { registerPizzaSchema } from "../../../../@types/pizza";
import { PizzaSize } from "../../../../@types/types";

type RegisterPizzaFormData = z.infer<typeof registerPizzaSchema>;

async function convertUrlToFile(imageUrl: string): Promise<File> {
  const response = await fetch(imageUrl);
  const blob = await response.blob();
  const fileName = imageUrl.split("/").pop() || "existing-image.jpg";
  return new File([blob], fileName, { type: blob.type });
}

export default function PizzaManagerForm({
  selected,
  handlePizzaUpdated,
}: {
  selected: (Product & { price: Record<PizzaSize, number> }) | null;
  handlePizzaUpdated: (
    updatedPizza: Product & { price: Record<PizzaSize, number> }
  ) => void;
}) {
  const [image, setImage] = useState<string | null>(selected?.image || null);
  const [dragActive, setDragActive] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<RegisterPizzaFormData>({
    resolver: zodResolver(registerPizzaSchema),
    defaultValues: {
      picture: null as unknown as File,
      name: "",
      description: "",
      price: {
        P: "" as unknown as number,
        M: "" as unknown as number,
        G: "" as unknown as number,
        GG: "" as unknown as number,
      },
    },
  });

  useEffect(() => {
    const changeValues = async () => {
      if (selected) {
        setImage(selected.image);
        form.setValue("name", selected.name);
        if (selected.image) {
          form.setValue("picture", await convertUrlToFile(selected.image));
        }
        form.setValue("description", selected?.description!);
        form.setValue("price.P", selected.price.P || ("" as unknown as number));
        form.setValue(
          "price.M",
          selected?.price?.M || ("" as unknown as number)
        );
        form.setValue(
          "price.G",
          selected?.price?.G || ("" as unknown as number)
        );
        form.setValue(
          "price.GG",
          selected?.price?.GG || ("" as unknown as number)
        );
      }
    };
    changeValues();
  }, [selected]);

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

  async function onSubmit(values: z.infer<typeof registerPizzaSchema>) {
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("id", (selected?.id as string) || "");
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("price", JSON.stringify(values.price));
    formData.append("picture", values.picture as File);
    const updatePromise = fetch("/api/pizza", {
      method: "PATCH",
      body: formData,
    });
    toast.promise(updatePromise, {
      loading: "Atualizando sua pizza...",
      success: async (data) => {
        const resp = await data.json();
        setIsSubmitting(false);
        form.reset();
        setImage(null);
        setDragActive(false);
        handlePizzaUpdated(
          resp.pizza as Product & { price: Record<PizzaSize, number> }
        );
        return "Pizza atualizada com sucesso!";
      },
      error: async (error) => {
        setIsSubmitting(false);
        return "Erro ao atualizar pizza.";
      },
    });
  }

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
    form.setValue(`price.${size}`, value as unknown as number, {
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
                    className={`relative ${
                      selected
                        ? "cursor-pointer"
                        : "cursor-not-allowed opacity-50"
                    } flex flex-col items-center gap-2 bg-fbg rounded-md border-2 border-dashed ${
                      dragActive
                        ? "border-blue-500 animate-pulse"
                        : "border-border-pizza"
                    } aspect-square md:w-80 w-full shadow-lg justify-center transition-all duration-300 text-black`}
                  >
                    {selected ? (
                      <>
                        {image ? (
                          <div className="relative w-full h-full">
                            <Image
                              src={
                                image.startsWith("blob:") ? image : `${image}`
                              }
                              alt="Pizza"
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
                      </>
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
                  <FormLabel>Nome da Pizza</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-fbg border-border-pizza shadow-md"
                      placeholder="Insira aqui o nome da Pizza"
                      disabled={selected ? false : true}
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
                  <FormLabel>Descrição do Pizza</FormLabel>
                  <FormControl>
                    <Textarea
                      className="bg-fbg border-border-pizza shadow-md h-52 resize-none"
                      placeholder="Insira aqui a descrição da Pizza"
                      disabled={selected ? false : true}
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
              name="price.P"
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
                      disabled={selected ? false : true}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price.M"
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
                      disabled={selected ? false : true}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price.G"
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
                      disabled={selected ? false : true}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price.GG"
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
                      disabled={selected ? false : true}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <Button
          type="submit"
          disabled={isSubmitting || (selected ? false : true)}
        >
          <Pencil /> Editar Pizza
        </Button>
      </form>
    </Form>
  );
}
