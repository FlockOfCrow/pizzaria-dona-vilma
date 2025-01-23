import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ShoppingCart } from "lucide-react";

export default function NavCart() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="bg-bg px-3 py-2 flex items-center gap-x-1 rounded-2xl border-[3px] border-border-pizza shadow-lg hover:bg-orange-pizza hover:bg-opacity-70 transition duration-300 text-center justify-center md:text-[1rem]">
          Carrinho <ShoppingCart />
        </button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="flex gap-1.5 items-center">
            <ShoppingCart />
            Carrinho
          </SheetTitle>
          <SheetDescription>Veja seu conteúdo no carrinho.</SheetDescription>
        </SheetHeader>
        <div className="mt-3">
          <div>item1</div>
          <div>item2</div>
          <div>item3</div>
          <div className="text-end mt-5">Total: R$0.00</div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
