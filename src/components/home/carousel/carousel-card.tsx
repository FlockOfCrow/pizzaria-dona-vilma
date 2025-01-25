import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CartProvider } from "@/context/carousel/cart-context";
import { SizeProvider } from "@/context/carousel/size-context";
import Image from "next/image";
import { ICarouselCard } from "../../../../@types/types";
import CarouselAddCart from "./cart/carousel-add-cart";

export default function CarouselCard({
  index,
  image,
  title,
  description,
  price,
}: ICarouselCard) {
  return (
    <SizeProvider>
      <Card className="bg-fbg shadow-md" key={index}>
        <CardContent className="items-center justify-center p-6">
          <div className="relative w-full h-40">
            <Image
              src={image}
              alt={title}
              className="object-cover"
              fill={true}
              quality={100}
            />
          </div>
          <div className="flex flex-col space-y-2 mt-2 items-center">
            <span className="text-lg font-semibold truncate w-full text-center">
              {title}
            </span>
            <Separator className="bg-border-pizza" />
            <span className="font-normal truncate w-full text-center">
              {description}
            </span>
            <CarouselAddCart
              index={index}
              image={image}
              title={title}
              description={description}
              price={price}
            />
          </div>
        </CardContent>
      </Card>
    </SizeProvider>
  );
}
