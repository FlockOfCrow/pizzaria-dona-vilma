"use client";

import { useCart } from "@/context/carousel/cart-context";
import NavCartItemCard from "./nav-cart-item-card";
import formatNumber from "@/utils/format-number";

export default function NavCartItem() {
  const { cart } = useCart();
  const totalPrice = cart.reduce((acc, product) => acc + product.price, 0);
  return (
    <>
      <div className="divide-y divide-gray-200">
        {cart.length === 0
          ? "Carrinho vazio."
          : cart.map((product, index) => (
              <NavCartItemCard
                key={index}
                id={product.id}
                name={product.name}
                price={product.price}
                image={product.image}
                quantity={product.quantity}
                description={product.description}
                size={product.size}
                type={product.type}
              />
            ))}
      </div>
      <div className="text-end text-lg underline mt-5">
        Total: {formatNumber(totalPrice)}
      </div>
    </>
  );
}
