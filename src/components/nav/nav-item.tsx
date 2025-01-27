import Link from "next/link";
import { INavItem } from "../../../@types/types";

export default function NavItem({ children, href }: INavItem) {
  return (
    <Link
      href={href}
      className="bg-bg lg:px-1 xl:px-3 xl:py-2 lg:py-1.5 px-3 py-2 flex items-center gap-x-1 rounded-2xl border-[3px] border-border-pizza shadow-lg hover:bg-orange-pizza hover:bg-opacity-70 transition duration-300 text-center justify-center md:text-[1rem] lg:text-sm xl:text-base"
    >
      {children}
    </Link>
  );
}
