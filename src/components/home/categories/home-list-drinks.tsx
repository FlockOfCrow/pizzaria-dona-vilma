import CartCard from "@/components/cart-card/cart-card";
import { IProduct } from "../../../../@types/types";

const pizzas: IProduct[] = [
  {
    name: "Coca-Cola",
    price: 13,
    image: "/drinks/coca_2l.png",
    type: "Drink",
  },
  {
    name: "Fanta Laranja",
    price: 11,
    image: "/drinks/fanta_laranja_2l.png",
    type: "Drink",
  },
  {
    name: "Guaraná",
    price: 11,
    image: "/drinks/guarana_2l.png",
    type: "Drink",
  },
  {
    name: "Sprite",
    price: 11,
    image: "/drinks/sprite_2l.png",
    type: "Drink",
  },
];

export default function HomeListDrinks() {
  return (
    <div className="grid 2xl:grid-cols-5 xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8 px-8">
      {pizzas.map((pizza, index) => (
        <CartCard
          key={index}
          index={index}
          image={pizza.image}
          name={pizza.name}
          description={pizza.description}
          price={pizza.price}
          type={pizza.type}
        />
      ))}
    </div>
  );
}
