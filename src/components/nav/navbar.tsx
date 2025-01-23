import { CircleUserRound, Flame, House, Menu, PiggyBank } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Cart from "./cart/cart";
import NavItem from "./nav-item";

export default function NavBar() {
  return (
    <nav className="flex flex-wrap flex-row items-center bg-fbg justify-between w-full xl:py-8 xl:px-5 2xl:py-8 2xl:px-20 p-8">
      <div className="lg:flex lg:flex-wrap lg:gap-x-5 md:hidden hidden">
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
        className="md:absolute md:left-1/2 md:transform md:-translate-x-1/2 flex flex-row items-center text-orange-pizza text-[2rem] xl:text-[2.3rem] 2xl:text-[3rem] font-bold italic"
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
      <div className="lg:flex lg:flex-wrap lg:gap-x-5 md:hidden hidden">
        <Cart />
        <NavItem href={"/login"}>
          Acessar Conta <CircleUserRound />
        </NavItem>
      </div>
      <button className="md:hidden">
        <Menu className="h-8 w-8" />
      </button>
    </nav>
  );
}
