import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useSize } from "@/context/carousel/size-context";
import Image from "next/image";
import { ICarouselCard } from "../../../../../@types/types";
import CarouselSizeCartButton from "./carousel-size-cart-button";
import formatNumber from "@/utils/format-numer";

export default function CarouselAddCart({
  index,
  description,
  title,
  image,
  price,
}: ICarouselCard) {
  const { itemSize } = useSize();

  const handleAddToCart = () => {
    if (itemSize) {
      const price = 10; // Defina o preço com base no tamanho e quantidade
      // adicionar carrinho
    }
  };

  return (
    <Dialog key={index}>
      <DialogTrigger asChild>
        <Button className="bg-separator-pizza text-white">
          Adicionar ao Carrinho
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-bg">
        <DialogHeader>
          <DialogTitle className="text-center">{title}</DialogTitle>
          <DialogDescription className="text-center">
            {description}
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-x-4">
          <div className="space-y-2">
            <div className="relative rounded-full aspect-square border-2 border-separator-pizza">
              <Image
                src={image}
                alt={title}
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
                <CarouselSizeCartButton size="P" />
                <CarouselSizeCartButton size="M" />
                <CarouselSizeCartButton size="G" />
                <CarouselSizeCartButton size="GG" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="font-semibold text-center">Preço</div>
              <div className="grid xl:grid-cols-2 grid-cols-1 items-center gap-y-2">
                <div className="text-2xl underline items-center xl:text-start text-center">
                  {formatNumber(price)}
                </div>
                <div className="flex items-center justify-center">
                  <Button className="rounded-r-none w-6 h-8 bg-fbg text-black shadow-none hover:bg-border-pizza">
                    -
                  </Button>
                  <Button className="pointer-events-none rounded-l-none rounded-r-none w-6 h-8 bg-fbg text-black shadow-none hover:bg-border-pizza">
                    0
                  </Button>
                  <Button className="rounded-l-none w-6 h-8 bg-fbg text-black shadow-none hover:bg-border-pizza">
                    +
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-x-2">
          <Button className="bg-button-pizza text-white border border-border-pizza hover:bg-separator-pizza">
            Confirmar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
