"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { IPizza } from "../../../../@types/types";
import CarouselCard from "./carousel-card";

const pizzas: IPizza[] = [
  {
    name: "Margherita",
    description: "Tomate, Mussarela, Manjericão",
    price: 12.0,
    image: "/pizzas/pizza_icon01.png",
  },
  {
    name: "Pepperoni",
    description: "Tomate, Mussarela, Pepperoni",
    price: 14.0,
    image: "/pizzas/pizza_icon02.png",
  },
  {
    name: "Frango com Barbecue",
    description: "Molho Barbecue, Frango, Cebola Roxa, Coentro",
    price: 16.0,
    image: "/pizzas/pizza_icon03.png",
  },
  {
    name: "Havaiana",
    description: "Tomate, Mussarela, Presunto, Abacaxi",
    price: 15.0,
    image: "/pizzas/pizza_icon04.png",
  },
  {
    name: "Vegetariana",
    description: "Tomate, Mussarela, Pimentão, Azeitonas, Cebola",
    price: 13.0,
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
              <CarouselCard
                index={index}
                title={pizza.name}
                description={pizza.description}
                image={pizza.image}
                price={pizza.price}
                key={index}
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="bg-transparent hover:bg-fbg shadow-md border-border-pizza md:flex hidden" />
      <CarouselNext className="bg-transparent hover:bg-fbg shadow-md border-border-pizza md:flex hidden" />
    </Carousel>
  );
}
