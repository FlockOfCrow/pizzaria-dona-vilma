"use client";

import { useCart } from "@/context/carousel/cart-context";
import { IPizza } from "../../../@types/types";
import CarouselCard from "./carousel/carousel-card";

const pizzas: IPizza[] = [
  {
    name: "Baiana",
    description: "Calabresa moída, ovos, cebola e pimenta",
    price: 45,
    image: "/pizzas/pizza_icon01.png",
  },
  {
    name: "Frango com Catupiry",
    description: "Frango desfiado com catupiry e orégano",
    price: 45,
    image: "/pizzas/pizza_icon02.png",
  },
  {
    name: "Portuguesa",
    description: "Presunto, ovo, cebola, ervilha e orégano",
    price: 45,
    image: "/pizzas/pizza_icon03.png",
  },
  {
    name: "Quatro Queijos",
    description: "Mussarela, provolone, catupiry e parmesão",
    price: 45,
    image: "/pizzas/pizza_icon04.png",
  },
  {
    name: "Vegetariana",
    description: "Mussarela, tomate, cebola, champignon e orégano",
    price: 45,
    image: "/pizzas/pizza_icon05.png",
  },
  {
    name: "Pizza Doce",
    description: "Banana, chocolate ao leite, açúcar e canela",
    price: 0,
    image: "/pizzas/pizza_icon03.png",
  },
];

export default function HomeListPizza() {
  const { cart } = useCart();
  return (
    <div className="grid 2xl:grid-cols-5 xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8 px-8">
      {pizzas.map((pizza, index) => (
        <CarouselCard
          key={index}
          index={index}
          image={pizza.image}
          title={pizza.name}
          description={pizza.description}
          price={pizza.price}
        />
      ))}
    </div>
  );
}
