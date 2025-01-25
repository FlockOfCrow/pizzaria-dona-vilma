"use client";

import CartCard from "@/components/cart-card/cart-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { IPizza } from "../../../../@types/types";

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
];

export default function PromotionCarousel() {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 5000,
        }),
      ]}
      className="w-full max-w-full mt-5"
    >
      <CarouselContent>
        {pizzas.map((pizza, index) => (
          <CarouselItem
            key={index}
            className="md:basis-1/3 lg:basis-1/2 xl:basis-1/2 2xl:basis-1/3 basis-2/3 w-full"
          >
            <div className="p-1">
              <CartCard
                index={index}
                name={pizza.name}
                description={pizza.description}
                image={pizza.image}
                price={pizza.price}
                key={index}
                type={pizza.type}
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="bg-transparent hover:bg-fbg shadow-md border-border-pizza lg:flex hidden" />
      <CarouselNext className="bg-transparent hover:bg-fbg shadow-md border-border-pizza lg:flex hidden" />
    </Carousel>
  );
}
