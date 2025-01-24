import { Button } from "@/components/ui/button";
import { useSize } from "@/context/carousel/size-context";
import {
    ICarouselSizeCartButton,
    PizzaSize,
} from "../../../../../@types/types";

export default function CarouselSizeCartButton({
  size,
}: ICarouselSizeCartButton) {
  const { itemSize, setItemSize } = useSize();

  return (
    <Button
      id={size}
      className={`${
        itemSize === size ? "bg-fbg" : "bg-bg"
      } text-black border border-border-pizza hover:bg-fbg`}
      onClick={() => setItemSize(size as PizzaSize)}
    >
      {size}
    </Button>
  );
}
