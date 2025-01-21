import RegisterForm from "@/components/auth/register-form";
import Image from "next/image";

export default function Register() {
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
        <div className="text-[2rem] text-orange-pizza flex flex-col">
          <span>Crie sua</span>
          <span>Conta</span>
        </div>
        <div className="lg:mt-4 md:mt-auto">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}
