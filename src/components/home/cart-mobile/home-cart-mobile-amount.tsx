"use client";

import { useCart } from "@/context/carousel/cart-context";

export default function HomeCartMobileAmount() {
  const { cart } = useCart();
  const itemCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  return (
    <>
      {itemCount > 0 && (
        <span className="absolute top-0 right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center transform translate-x-1/2 -translate-y-1/2">
          {itemCount > 9 ? "9+" : itemCount}
        </span>
      )}
    </>
  );
}
