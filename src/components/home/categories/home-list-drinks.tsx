import CartCard from "@/components/cart-card/cart-card";
import { IProduct } from "../../../../@types/types";

export const drinks: IProduct[] = [
  {
    name: "Coca-Cola",
    price: 13,
    image: "/drinks/coca_2l.png",
    type: "Drink",
    description: "Refrigerante de Cola, Lata, 1L, 2L",
  },
  {
    name: "Fanta Laranja",
    price: 11,
    image: "/drinks/fanta_laranja_2l.png",
    type: "Drink",
    description: "Refrigerante de Laranja, Lata, 1L, 2L",
  },
  {
    name: "Guaraná",
    price: 11,
    image: "/drinks/guarana_2l.png",
    type: "Drink",
    description: "Refrigerante de Guaraná, Lata, 1L, 2L",
  },
  {
    name: "Sprite",
    price: 11,
    image: "/drinks/sprite_2l.png",
    type: "Drink",
    description: "Refrigerante de Limão, Lata, 1L, 2L",
  },
];

export default function HomeListDrinks() {
  return (
    <div className="grid 2xl:grid-cols-5 xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8 px-8">
      {drinks.map((drink, index) => (
        <CartCard
          key={index}
          index={index}
          image={drink.image}
          name={drink.name}
          description={drink.description}
          price={drink.price}
          type={drink.type}
        />
      ))}
    </div>
  );
}
