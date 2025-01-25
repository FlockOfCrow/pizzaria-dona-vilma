import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useCart } from "@/context/carousel/cart-context";
import { useSize } from "@/context/carousel/size-context";
import formatNumber from "@/utils/format-number";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { v4 } from "uuid";
import { IProductCard, Sizes } from "../../../@types/types";
import CartSizeCard from "./cart-size-card";

export default function CartAddCard({
  index,
  description,
  image,
  price,
  type,
  name,
}: IProductCard) {
  const { itemSize, setQuantity, quantity } = useSize();
  const { setCart, cart } = useCart();

  const [itemPrice, setItemPrice] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    setItemPrice(getItemPrice() * (quantity || 1));
  }, [itemSize, price, quantity]);

  const getItemPrice = (): number => {
    const priceMultipliers: Record<Sizes, number> = {
      P: 1,
      M: 55 / price,
      G: 65 / price,
      GG: 80 / price,
      "2L": 1,
      "1L": 0.9,
      Lata: 0.6,
    };
    return (itemSize && price * priceMultipliers[itemSize]) || 0;
  };

  const handleAddToCart = () => {
    if (itemSize) {
      setCart([
        ...cart,
        {
          id: v4(),
          name: name,
          image,
          price: itemPrice,
          size: itemSize,
          quantity,
        },
      ]);
      toast.success("Item adicionado ao carrinho", {
        description: `${quantity}x ${name} - ${itemSize}`,
      });
      setOpen(false);
    } else {
      toast.error("Selecione um tamanho para adicionar ao carrinho");
    }
  };

  const handleAddQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleRemoveQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen} key={index}>
      <DialogTrigger asChild>
        <Button className="bg-separator-pizza text-white">
          Adicionar ao Carrinho
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-bg">
        <DialogHeader>
          <DialogTitle className="text-center">{name}</DialogTitle>
          <DialogDescription className="text-center">
            {description}
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-x-4">
          <div className="space-y-2">
            <div className="relative rounded-full aspect-square border-2 border-separator-pizza">
              <Image
                src={image}
                alt={name}
                fill={true}
                objectFit={"cover"}
                className="object-cover rounded-full"
              />
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <div className="font-semibold text-center">Tamanho</div>
              <div className="grid grid-cols-2 gap-4">
                {type === "Drink" ? (
                  <>
                    <CartSizeCard size="2L" />
                    <CartSizeCard size="1L" />
                    <CartSizeCard size="Lata" />
                  </>
                ) : (
                  <>
                    <CartSizeCard size="P" />
                    <CartSizeCard size="M" />
                    <CartSizeCard size="G" />
                    <CartSizeCard size="GG" />
                  </>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <div className="font-semibold text-center">Preço</div>
              <div className="grid xl:grid-cols-2 grid-cols-1 items-center gap-y-2">
                <div className="text-xl underline items-center xl:text-start text-center">
                  {formatNumber(itemPrice)}
                </div>
                <div className="flex items-center justify-center">
                  <Button
                    onClick={handleRemoveQuantity}
                    className="rounded-r-none w-6 h-8 bg-fbg text-black shadow-none hover:bg-border-pizza"
                  >
                    -
                  </Button>
                  <Button className="pointer-events-none rounded-l-none rounded-r-none w-6 h-8 bg-fbg text-black shadow-none hover:bg-border-pizza">
                    {quantity}
                  </Button>
                  <Button
                    onClick={handleAddQuantity}
                    className="rounded-l-none w-6 h-8 bg-fbg text-black shadow-none hover:bg-border-pizza"
                  >
                    +
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-x-2">
          <Button
            onClick={handleAddToCart}
            className="bg-button-pizza text-white border border-border-pizza hover:bg-separator-pizza"
          >
            Confirmar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
