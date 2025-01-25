"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import { IChildren } from "../../../../@types/types";
import NavCartItem from "./nav-cart-item";

export default function NavCart({ children }: IChildren) {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex gap-1.5 items-center">
            <ShoppingCart />
            Carrinho
          </SheetTitle>
          <SheetDescription>Veja seu conteúdo no carrinho.</SheetDescription>
        </SheetHeader>
        <div className="mt-3">
          <NavCartItem />
        </div>
      </SheetContent>
    </Sheet>
  );
}
