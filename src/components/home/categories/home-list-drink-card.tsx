import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SizeProvider } from "@/context/carousel/size-context";
import Image from "next/image";
import { IDrinkCard } from "../../../../@types/types";
import CarouselAddCart from "../carousel/cart/carousel-add-cart";

export default function HomeListDrinkCard({
  index,
  image,
  name,
  description,
  price,
}: IDrinkCard) {
  return (
    <SizeProvider>
      <Card
        className="bg-fbg shadow-md hover:scale-105 duration-300"
        key={index}
      >
        <CardContent className="items-center justify-center p-6">
          <div className="aspect-square relative w-full rounded-full">
            <Image
              src={image}
              alt={name}
              className="object-cover rounded-full"
              fill={true}
              quality={100}
            />
          </div>
          <div className="flex flex-col space-y-2 mt-2 items-center">
            <span className="text-lg font-semibold truncate w-full text-center">
              {name}
            </span>
            <Separator className="bg-border-pizza" />
            <span className="font-normal truncate w-full text-center">
              {description}
            </span>
            <CarouselAddCart
              index={index}
              image={image}
              title={name}
              description={description}
              price={price}
            />
          </div>
        </CardContent>
      </Card>
    </SizeProvider>
  );
}
