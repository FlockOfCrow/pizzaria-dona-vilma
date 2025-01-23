import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface ICarouselCard {
  index: number;
  image: string;
  title: string;
  description: string;
}

export default function HomeCarouselCard({
  index,
  image,
  title,
  description,
}: ICarouselCard) {
  return (
    <Card key={index}>
      <CardContent className="items-center justify-center p-6">
        <div className="relative w-full h-40">
          <Image
            src={image}
            alt={title}
            className="object-cover"
            layout="fill"
          />
        </div>
        <div className="flex flex-col space-y-2 mt-2 items-center">
          <span className="text-xl font-semibold truncate w-full text-center">
            {title}
          </span>
          <Separator />
          <span className="font-normal truncate w-full text-center">
            {description}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
