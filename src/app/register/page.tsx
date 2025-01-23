import InfoCard from "@/components/auth/info-card";
import RegisterForm from "@/components/auth/register-form";
import AuthTitle from "@/components/auth/title";
import { UtensilsCrossed } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Register() {
  return (
    <div className="flex flex-row items-center min-h-screen justify-between bg-bg w-screen">
      <Link
        href="/"
        className="w-[70vw] min-h-screen flex justify-center items-center"
      >
        <Image src="/logo02.png" alt="logo02" width={500} height={500} />
      </Link>
      <div className="w-[30vw] min-h-screen border-l-[1px] border-l-[#CFBB90] bg-fbg py-6 px-16 flex flex-col">
        <AuthTitle />
        <div className="text-[2rem] my-2 text-orange-pizza flex flex-col">
          <span>Crie sua</span>
          <span>Conta</span>
        </div>
        <div className="lg:mt-4 md:mt-auto">
          <RegisterForm />
        </div>
        <div className="flex flex-col mt-10 justify-center items-center space-y-10">
          <InfoCard>
            <div className="flex gap-1 items-center">
              <div>Já possui uma conta?</div>
              <UtensilsCrossed className="w-5 h-5" />
            </div>
            <div className="text-button-pizza hover:text-button-hover-pizza">
              <Link href="/login">Faça login CLICANDO AQUI</Link>
            </div>
          </InfoCard>
        </div>
      </div>
    </div>
  );
}
