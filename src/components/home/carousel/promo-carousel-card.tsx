import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface ICarouselCard {
  index: number;
  image: string;
  title: string;
  description: string;
}

export default function PromotionCarouselCard({
  index,
  image,
  title,
  description,
}: ICarouselCard) {
  return (
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
        </div>
      </CardContent>
    </Card>
  );
}
