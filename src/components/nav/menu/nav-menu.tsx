import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Flame, House, Menu, PiggyBank } from "lucide-react";
import Link from "next/link";

export default function NavMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button>
          <Menu className="h-8 w-8" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40 bg-bg border-2 border-border-pizza ">
        <DropdownMenuLabel className="text-center">Menu</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-border-pizza" />
        <div className="space-y-2 p-1">
          <DropdownMenuGroup
            asChild
            className="flex items-center gap-x-1 hover:bg-fbg rounded-md"
          >
            <Link href={"#"}>
              <House className="h-5 w-5" />
              <span>Inicio</span>
            </Link>
          </DropdownMenuGroup>
          <DropdownMenuGroup
            asChild
            className="flex items-center gap-x-1 hover:bg-fbg rounded-md"
          >
            <Link href={"#promocoes"}>
              <PiggyBank className="h-5 w-5" />
              <span>Promoções</span>
            </Link>
          </DropdownMenuGroup>
          <DropdownMenuGroup
            asChild
            className="flex items-center gap-x-1 hover:bg-fbg rounded-md"
          >
            <Link href={"#mais-vendidas"}>
              <Flame className="h-5 w-5" />
              <span>Mais Vendidas</span>
            </Link>
          </DropdownMenuGroup>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
