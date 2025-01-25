"use client";

import { useCart } from "@/context/carousel/cart-context";
import NavCartItemCard from "./nav-cart-item-card";

export default function NavCartItem() {
  const { cart } = useCart();
  console.log(cart);
  return (
    <div className="divide-y divide-gray-200">
      {cart.length === 0
        ? "Carrinho vazio."
        : cart.map((product, index) => (
            <NavCartItemCard
              key={index}
              name={product.name}
              price={product.price}
              image={product.image}
              quantity={product.quantity}
            />
          ))}
    </div>
  );
}
