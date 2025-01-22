import Link from "next/link";

interface INavItem {
  children: React.ReactNode;
  href: string;
}

export default function NavItem({ children, href }: INavItem) {
  return (
    <Link
      href={href}
      className="bg-bg px-3 py-2 flex items-center gap-x-1 rounded-2xl border-[3px] border-border-pizza shadow-lg hover:bg-orange-pizza hover:bg-opacity-70 transition duration-300 text-center justify-center"
    >
      {children}
    </Link>
  );
}
