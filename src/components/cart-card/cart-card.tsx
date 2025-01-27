"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SizeProvider } from "@/context/carousel/size-context";
import Image from "next/image";
import { IProductCard } from "../../../@types/types";
import CartAddCard from "./cart-add-card";
import { nameType } from "@/utils/type-name";

export default function CartCard({
  index,
  image,
  name,
  description,
  price,
  type,
}: IProductCard) {
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
              {nameType(type)} {name}
            </span>
            <div className="w-full">
              <Separator className="bg-border-pizza" />
            </div>
            <span className="font-normal truncate w-full text-center">
              {description}
            </span>
            <div className="w-full pb-2.5">
              <Separator className="bg-border-pizza" />
            </div>
            <CartAddCard
              index={index}
              image={image}
              name={name}
              description={description}
              price={price}
              type={type}
            />
          </div>
        </CardContent>
      </Card>
    </SizeProvider>
  );
}
