import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="bg-bg min-h-screen lg:items-stretch items-center justify-center flex bg-[url(/background2.png)] bg-repeat bg-center">
      <div className="flex lg:flex-row flex-col items-center p-10">
        <Link href={"/"} className="relative -mt-16">
          <Image
            src={"/logo02.png"}
            alt="logo"
            width={500}
            height={500}
          ></Image>
        </Link>
        <Separator
          orientation="vertical"
          className="bg-black mr-10 h-1/3 lg:block hidden"
        />
        <Separator
          orientation="horizontal"
          className="bg-black -mt-12 mb-9 w-full h-[1.2px] lg:hidden block"
        />
        <h1 className="text-xl font-semibold text-center">
          404 - Página não encontrada!
        </h1>
      </div>
    </div>
  );
}
