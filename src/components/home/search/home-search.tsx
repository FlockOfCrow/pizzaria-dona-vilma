"use client";

import CartCard from "@/components/cart-card/cart-card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import HomeCategories from "../categories/home-categories";
import { drinks } from "../categories/home-list-drinks";
import { pizzas } from "../categories/home-list-pizza";

export default function HomeSearch() {
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>(search);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  const allProducts = [...pizzas, ...drinks];

  const findProduct = allProducts.filter((product) =>
    product.name.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  console.log(search, findProduct);
  return (
    <>
      <div className="flex flex-row justify-between truncate gap-x-2">
        <div className="relative w-1/2">
          <Input
            type="search"
            className="shadow-xl bg-bg border-2 border-border-pizza rounded-lg pl-10"
            placeholder="Digite aqui sua pesquisa..."
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>
        <HomeCategories />
      </div>
      {findProduct.length > 0 && debouncedSearch.length > 0 ? (
        <div className="grid grid-cols-1 2xl:grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {findProduct.map((item, index) => (
            <CartCard
              image={item.image}
              name={item.name}
              price={item.price}
              description={item.description}
              key={index}
              index={index}
              type={item.type}
            />
          ))}
        </div>
      ) : (
        debouncedSearch.length > 0 && (
          <div className="text-center mt-4">Nenhum produto encontrado.</div>
        )
      )}
    </>
  );
}
