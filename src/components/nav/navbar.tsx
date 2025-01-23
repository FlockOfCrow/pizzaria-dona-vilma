import { CircleUserRound, Flame, House, Menu, PiggyBank } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import NavCart from "./cart/nav-cart";
import NavItem from "./nav-item";
import NavMenu from "./menu/nav-menu";

export default function NavBar() {
  return (
    <nav className="flex flex-wrap flex-row items-center bg-fbg justify-between w-full xl:py-8 xl:px-5 2xl:py-8 2xl:px-20 p-8">
      <div className="lg:flex lg:flex-wrap lg:gap-x-5 hidden">
        <NavItem href={"#"}>
          <House /> Inicio
        </NavItem>
        <NavItem href={"#promocoes"}>
          <PiggyBank /> Promoções
        </NavItem>
        <NavItem href={"#mais-vendidas"}>
          <Flame /> Mais Vendidas
        </NavItem>
      </div>
      <Link
        href={"/"}
        className="lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2 flex flex-row items-center text-orange-pizza text-[1.4rem] xl:text-[2.3rem] 2xl:text-[3rem] font-bold italic"
      >
        <div className="-mr-[0.7rem]">Dona</div>
        <Image
          src="/pizza02.png"
          alt="pizza02"
          width={106 - 30}
          height={97 - 30}
          className="-my-6"
        />
        <div>Vilma</div>
      </Link>
      <div className="lg:flex lg:flex-wrap lg:gap-x-5 hidden">
        <NavCart />
        <NavItem href={"/login"}>
          Acessar Conta <CircleUserRound />
        </NavItem>
      </div>
      <div className="flex items-center space-x-3 lg:hidden">
        <Link href={"/login"}>
          <CircleUserRound className="h-7 w-7" />
        </Link>
        <NavMenu />
      </div>
    </nav>
  );
}
