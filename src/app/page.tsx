import Footer from "@/components/footer/footer";
import BestSellingCarousel from "@/components/home/carousel/best-selling-carousel";
import PromotionCarousel from "@/components/home/carousel/promo-carousel";
import HomeCardMobileButton from "@/components/home/cart-mobile/home-cart-mobile-button";
import HomeCategories from "@/components/home/categories/home-categories";
import HomeBanner from "@/components/home/home-banner";
import HomeListPizza from "@/components/home/home-list-pizza";
import HomeLocation from "@/components/home/home-location";
import NavCart from "@/components/nav/cart/nav-cart";
import NavBar from "@/components/nav/navbar";
import { Input } from "@/components/ui/input";
import { Flame, PiggyBank, Pizza, Search } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-[url(/background2.png)] bg-repeat bg-center">
      <NavBar />
      <main className="flex flex-col items-center justify-center w-full flex-grow 2xl:py-20 py-8 space-y-16">
        <div className="flex flex-1 w-full h-full 2xl:gap-x-44 2xl:flex-row xl:px-8 px-4 2xl:px-28">
          <div className="space-y-8 lg:w-1/2 lg:h-full w-full h-full">
            <div className="flex flex-row justify-between truncate gap-x-2">
              <div className="relative w-1/2">
                <Input
                  type="search"
                  className="shadow-xl bg-bg border-2 border-border-pizza rounded-lg pl-10"
                  placeholder="Digite aqui sua pesquisa..."
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              </div>
              <HomeCategories />
            </div>
            <div className="sm:w-full md:w-full h-full md:space-y-6 lg:hidden block">
              <HomeLocation />
            </div>
            <div id="promocoes">
              <div className="flex flex-col -space-y-2 font-bold text-[2rem]">
                <h1>Promoções em</h1>
                <div>
                  <div className="flex items-center gap-x-1">
                    <h1>Destaque</h1>
                    <Flame className="fill-orange-pizza stroke-none h-8 w-8" />
                  </div>
                </div>
              </div>
              <PromotionCarousel />
            </div>
            <div id="mais-vendidas">
              <div className="flex flex-col -space-y-2 font-bold text-[2rem]">
                <h1>Pizzas mais</h1>
                <div>
                  <div className="flex items-center gap-x-1">
                    <h1>Vendidas</h1>
                    <PiggyBank className="fill-orange-pizza stroke-none h-8 w-8" />
                  </div>
                </div>
              </div>
              <BestSellingCarousel />
            </div>
          </div>
          <div className="lg:w-1/2 lg:h-full lg:space-y-6 hidden lg:block">
            <HomeLocation />
            <HomeBanner href="/" src="/cupons/super_cupom.png" />
            <HomeBanner className="pt-2" src="/cupons/super_cupom.png" />
          </div>
        </div>
        <div className="flex flex-1 w-full h-full 2xl:gap-x-44 2xl:flex-row xl:px-8 px-4 2xl:px-28">
          <div id="promocoes" className="space-y-5">
            <div className="flex flex-col -space-y-2 font-bold text-[2rem]">
              <h1>Todas as</h1>
              <div>
                <div className="flex items-center gap-x-1.5">
                  <h1>Pizzas</h1>
                  <Pizza className="text-orange-pizza h-8 w-8" />
                </div>
              </div>
            </div>
            <HomeListPizza />
          </div>
        </div>
      </main>
      <Footer />
      <div className="lg:hidden">
        <NavCart>
          <HomeCardMobileButton />
        </NavCart>
      </div>
    </div>
  );
}
