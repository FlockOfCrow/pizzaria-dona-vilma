"use client";

import { IPizza } from "../../../@types/types";
import CarouselCard from "./carousel/carousel-card";

const pizzas: IPizza[] = [
  {
    name: "Moda",
    description:
      "Molho de tomate, muçarela, frango, tomate, presunto, calabresa, milho verde, cebola e orégano",
    price: 45,
    image: "/pizzas/pizza_01.png",
  },
  {
    name: "Frango com Catupiry",
    description: "Molho de tomate, muçarela, frango com catupiry e orégano",
    price: 45,
    image: "/pizzas/pizza_02.png",
  },
  {
    name: "Calabresa",
    description:
      "Molho de tomate, muçarela, tomate, calabresa, cebola, pimentão e orégano",
    price: 45,
    image: "/pizzas/pizza_03.png",
  },
  {
    name: "Bauru",
    description:
      "Molho de tomate, muçarela, tomate, presunto, cebola, pimentão e orégano",
    price: 45,
    image: "/pizzas/pizza_04.png",
  },
  {
    name: "Franbacon",
    description:
      "Molho de tomate, muçarela, calabresa, presunto, tomate, pimentão, pimenta, cebola e orégano",
    price: 45,
    image: "/pizzas/pizza_06.png",
  },
  {
    name: "Palmito",
    description: "Molho de tomate, muçarela, palmito, tomate, cebola e orégano",
    price: 45,
    image: "/pizzas/pizza_07.png",
  },
  {
    name: "Marguerita",
    description:
      "Molho de tomate, tomate, muçarela, manjericão, palmito e orégano",
    price: 45,
    image: "/pizzas/pizza_08.png",
  },
  {
    name: "Pizza Vegetariana",
    description:
      "Molho de tomate, tomate, muçarela, pimentão, milho verde, cebola e orégano",
    price: 45,
    image: "/pizzas/pizza_09.png",
  },
  {
    name: "Quatro Queijos",
    description:
      "Molho de tomate, muçarela, cheddar, queijo defumado, parmesão, catupiry e orégano",
    price: 45,
    image: "/pizzas/pizza_10.png",
  },
  {
    name: "Banana",
    description: "Leite condensado, mussarela , banana e canela",
    price: 45,
    image: "/pizzas/pizza_11.png",
  },
];

export default function HomeListPizza() {
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
