import { ShoppingCart } from "lucide-react";
import HomeCartMobileAmount from "./home-cart-mobile-amount";

export default function HomeCartMobileButton() {
  return (
    <button className="fixed bottom-4 right-4 bg-bg text-black p-2 rounded-full border border-black shadow-md transition duration-300 items-center flex justify-center z-10 hover:bg-fbg ">
      <ShoppingCart className="w-7 h-7" />
      <HomeCartMobileAmount />
    </button>
  );
}
