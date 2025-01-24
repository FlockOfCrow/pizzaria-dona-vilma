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
import { Input } from "@/components/ui/input";

export default function CarouselAddCart({
  index,
  description,
  title,
  image,
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
          <DialogTitle className="text-center">
            Adicionar ao Carrinho
          </DialogTitle>
          <DialogDescription className="text-center">
            Selecione o tamanho e a quantidade desejada.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-x-4">
          <div className="space-y-2">
            <div className="font-semibold text-center">{title}</div>
            <div className="relative rounded-full aspect-square">
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
            <div>
              <div className="font-semibold text-center">Descrição</div>
              <p>{description}</p>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-x-2">
          <div className="flex gap-x-1">
            <Button>-</Button>
            <Input
              // type="number"
              className="w-10"
              placeholder="0"
              defaultValue={0}
            />
            <Button>+</Button>
          </div>
          <Button className="bg-button-pizza text-white border border-border-pizza hover:bg-separator-pizza">
            Confirmar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
