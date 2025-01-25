import { useCart } from "@/context/carousel/cart-context";
import formatNumber from "@/utils/format-number";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { ICartItem } from "../../../../@types/types";

export default function NavCartItemCard({
  id,
  name,
  image,
  price,
  quantity,
}: ICartItem) {
  const { cart, setCart } = useCart();
  const handleClick = () => {
    console.log(id);
    console.log(cart);
    const newCart = cart.filter((item) => item.id !== id);
    setCart(newCart);
    console.log(cart);
    toast.success("Item removido do carrinho", {
      description: `Você removeu ${quantity}x ${name}`,
    });
  };
  return (
    <div
      key={id}
      id={id.toString()}
      className="flex items-center space-x-4 border-b py-4 border-gray-200"
    >
      <div className="relative w-16 h-16 border-2 border-border-pizza rounded-full">
        <Image
          src={image}
          alt={`Pizza ${name}`}
          fill={true}
          className="object-cover rounded-full"
        />
      </div>
      <div className="flex-1">
        <div className="font-bold">Pizza {name}</div>
        <div className="text-sm text-gray-500">
          {quantity} unidade{quantity > 1 ? "s" : ""}
        </div>
        <div className="text-sm text-gray-500">{formatNumber(price)}</div>
      </div>
      <button onClick={handleClick} className="text-red-500 hover:text-red-700">
        <Trash2 size={20} />
      </button>
    </div>
  );
}
