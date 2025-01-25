import { Button } from "@/components/ui/button";
import { useSize } from "@/context/carousel/size-context";
import { ICartSizeCardButton } from "../../../@types/types";

export default function CartSizeCard({ size }: ICartSizeCardButton) {
  const { itemSize, setItemSize } = useSize();

  return (
    <Button
      id={size}
      className={`${
        itemSize === size ? "bg-fbg" : "bg-bg"
      } text-black border border-border-pizza hover:bg-fbg`}
      onClick={() => setItemSize(size)}
    >
      {size}
    </Button>
  );
}
