"use client";

import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { DialogTitle } from "@/components/ui/dialog";
import { Product } from "@prisma/client";
import { Search, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { PizzaSize } from "../../../../@types/types";
import PizzaManagerForm from "./pizza-manager-form";

export default function PizzaManagerComponent() {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [data, setData] = useState<Product[]>([]);
  const [selected, setSelected] = useState<Product | null>(null);

  const debounce = (func: (...args: any[]) => void, delay: number) => {
    let timeoutId: NodeJS.Timeout;
    return (...args: any[]) => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const handlePizzaUpdated = (
    updatedPizza: Product & { price: Record<PizzaSize, number> }
  ) => {
    setData((prevData) => {
      const index = prevData.findIndex((p) => p.id === updatedPizza.id);
      if (index === -1) return prevData;
      const newData = [...prevData];
      newData[index] = updatedPizza;
      setSelected(null);
      return newData;
    });
  };

  const fetchData = useCallback(
    debounce(async (searchTerm: string) => {
      setIsLoading(true);
      try {
        const res = await fetch(
          `/api/pizza?search=${encodeURIComponent(searchTerm)}`,
          {
            next: {
              revalidate: 5,
            },
          }
        );
        if (!res.ok) throw new Error("Falha ao buscar dados.");
        const result = await res.json();
        setData(result.pizzas);
        setIsLoading(false);
      } catch (e) {
        console.error(e);
        setIsLoading(false);
      }
    }, 300),
    []
  );

  useEffect(() => {
    fetchData(search);
  }, [search, fetchData]);

  return (
    <>
      {selected ? (
        <>
          <div className="pt-5">
            <div className="flex items-center justify-end gap-x-2">
              <Button
                onClick={() => setSelected(null)}
                className="bg-fbg border border-separator-pizza text-black hover:bg-border-pizza"
              >
                <X />
              </Button>
              <Button
                onClick={() => setOpen(!open)}
                className="px-6 bg-fbg border border-separator-pizza text-black hover:bg-border-pizza"
              >
                <Search />
                {selected.name}
              </Button>
            </div>
          </div>
        </>
      ) : (
        <div className="flex pt-5 justify-end">
          <Button
            onClick={() => setOpen(!open)}
            className="w-[50%] lg:w-[20%] bg-fbg border border-separator-pizza text-black hover:bg-border-pizza"
          >
            <Search />
            Procurar
          </Button>
        </div>
      )}
      <CommandDialog open={open} onOpenChange={setOpen}>
        <DialogTitle className="hidden" />
        <CommandInput
          value={search}
          onValueChange={(e) => setSearch(e)}
          placeholder="Digite o nome da pizza..."
        />
        <CommandList>
          {isLoading ? (
            <CommandEmpty>Procurando pizzas no sistema...</CommandEmpty>
          ) : data.length === 0 ? (
            <CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>
          ) : (
            <CommandGroup heading="Resultados">
              {data.map((pizza) => (
                <CommandItem
                  key={pizza.id}
                  value={pizza.name}
                  className="cursor-pointer"
                  onSelect={() => {
                    setSelected(pizza);
                    setOpen(false);
                  }}
                >
                  <div className="h-10 w-10 relative rounded-full">
                    {pizza.image && (
                      <Image
                        src={pizza.image}
                        alt={pizza.name}
                        fill
                        className="rounded-full object-cover"
                      />
                    )}
                  </div>
                  <span>{pizza.name}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
      <PizzaManagerForm
        selected={selected as Product & { price: Record<PizzaSize, number> }}
        handlePizzaUpdated={handlePizzaUpdated}
      />
    </>
  );
}
