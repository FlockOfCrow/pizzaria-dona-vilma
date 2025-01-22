import Image from "next/image";

export default function AuthTitle() {
  return (
    <div className="flex items-center justify-center text-orange-pizza text-[3rem] font-bold italic">
      <div className="-mr-[0.7rem]">Dona</div>
      <Image src="/pizza02.png" alt="pizza02" width={106} height={97} />
      <div>Vilma</div>
    </div>
  );
}
