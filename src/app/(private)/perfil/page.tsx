import Footer from "@/components/footer/footer";
import HomeCartMobileButton from "@/components/home/cart-mobile/home-cart-mobile-button";
import NavCart from "@/components/nav/cart/nav-cart";
import NavBar from "@/components/nav/navbar";
import ProfileForm from "@/components/profile/profile-form";
import { UserRound } from "lucide-react";

export default async function Profile() {
  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-[url(/background2.png)] bg-repeat bg-center">
      <NavBar />
      <main className="flex flex-col items-center justify-center w-full flex-grow space-y-16">
        <div className="flex flex-1 w-full h-full lg:p-10 p-8">
          <div className="flex flex-col w-full h-full justify-center items-center">
            <div className="lg:w-1/2 w-full space-y-8">
              <div className="text-2xl font-semibold flex space-x-1 items-center">
                <UserRound className="stroke-[2.5px]" />{" "}
                <span>Minha Conta</span>
              </div>
              <ProfileForm />
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <div className="lg:hidden">
        <NavCart>
          <HomeCartMobileButton />
        </NavCart>
      </div>
    </div>
  );
}
