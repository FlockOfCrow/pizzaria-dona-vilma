"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDown, CupSoda, Pizza } from "lucide-react";
import { useState } from "react";
import { ICategory } from "../../../../@types/types";

const categories: ICategory[] = [
  {
    value: "pizzas",
    label: "Pizzas",
    icon: Pizza,
  },
  {
    value: "bebidas",
    label: "Bebidas",
    icon: CupSoda,
  },
];

export default function HomeCategories() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const selectedCategory = categories.find(
    (category) => category.value === value
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="relative">
          <button
            role="combobox"
            aria-expanded={open}
            className="shadow-xl bg-bg border-2 border-border-pizza rounded-lg pl-3 py-1 flex items-center justify-between hover:bg-fbg transition duration-150"
          >
            {selectedCategory ? (
              <div className="flex items-center gap-x-1">
                <selectedCategory.icon />
                {selectedCategory.label}
              </div>
            ) : (
              "Listar Categorias"
            )}
            <ChevronDown className="ml-2 text-gray-500" />
          </button>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-full bg-bg border-2 border-border-pizza">
        <ul>
          {categories.map((category) => (
            <li
              key={category.value}
              className="cursor-pointer p-2 hover:bg-fbg rounded-lg"
              onClick={() => {
                setValue(category.value);
                setOpen(false);
              }}
            >
              <div className="flex gap-x-1">
                <category.icon />
                {category.label}
              </div>
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
}
