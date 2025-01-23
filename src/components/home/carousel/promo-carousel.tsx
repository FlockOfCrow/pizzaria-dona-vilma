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
import PromotionCarouselCard from "./promo-carousel-card";

const pizzas: IPizza[] = [
  {
    name: "Margherita",
    description: "Tomate, Mussarela, Manjericão",
    price: "R$ 12,00",
    image: "/pizzas/pizza_icon01.png",
  },
  {
    name: "Pepperoni",
    description: "Tomate, Mussarela, Pepperoni",
    price: "R$ 14,00",
    image: "/pizzas/pizza_icon02.png",
  },
  {
    name: "Frango com Barbecue",
    description: "Molho Barbecue, Frango, Cebola Roxa, Coentro",
    price: "R$ 16,00",
    image: "/pizzas/pizza_icon03.png",
  },
  {
    name: "Havaiana",
    description: "Tomate, Mussarela, Presunto, Abacaxi",
    price: "R$ 15,00",
    image: "/pizzas/pizza_icon04.png",
  },
  {
    name: "Vegetariana",
    description: "Tomate, Mussarela, Pimentão, Azeitonas, Cebola",
    price: "R$ 13,00",
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
            className="md:basis-2/2 lg:basis-1/3 w-full"
          >
            <div className="p-1">
              <PromotionCarouselCard
                index={index}
                title={pizza.name}
                description={pizza.description}
                image={pizza.image}
                key={index}
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="bg-transparent hover:bg-fbg shadow-md" />
      <CarouselNext className="bg-transparent hover:bg-fbg shadow-md" />
    </Carousel>
  );
}
