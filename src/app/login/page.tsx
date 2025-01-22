import LoginCard from "@/components/auth/login-card";
import LoginForm from "@/components/auth/login-form";
import { Separator } from "@/components/ui/separator";
import { UtensilsCrossed } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";

export default function Login() {
  return (
    <div className="flex flex-row items-center min-h-screen justify-between bg-bg w-screen">
      <div className="w-[70vw] min-h-screen flex justify-center items-center">
        <Image src="/logo02.png" alt="logo02" width={500} height={500} />
      </div>
      <div className="w-[30vw] min-h-screen border-l-[1px] border-l-[#CFBB90] bg-fbg py-6 px-16 flex flex-col">
        <div className="flex items-center justify-center text-orange-pizza text-[3rem]">
          <div className="-mr-[0.7rem]">Dona</div>
          <Image src="/pizza02.png" alt="pizza02" width={106} height={97} />
          <div>Vilma</div>
        </div>
        <div className="text-[2rem] my-2 text-orange-pizza flex flex-col">
          <span>Acesse sua</span>
          <span>Conta</span>
        </div>
        <div className="lg:mt-4 md:mt-auto">
          <LoginForm />
        </div>
        <div className="flex flex-col mt-20 justify-center items-center space-y-10">
          <LoginCard>
            <div className="flex gap-1 items-center">
              <div>Não tem uma conta?</div>
              <UtensilsCrossed className="w-5 h-5" />
            </div>
            <div className="text-button-pizza hover:text-button-hover-pizza">
              <Link href="/register">Se inscreva GRATUITAMENTE</Link>
            </div>
          </LoginCard>
          <Separator className="bg-separator-pizza" />
          <LoginCard>
            <Link href={"/auth/google"}>
              <div className="flex group-hover:hover:text-button-hover-pizza justify-center items-center gap-x-2">
                Conecte-se pelo Google: <FcGoogle className="w-8 h-8" />
              </div>
            </Link>
          </LoginCard>
        </div>
      </div>
    </div>
  );
}
