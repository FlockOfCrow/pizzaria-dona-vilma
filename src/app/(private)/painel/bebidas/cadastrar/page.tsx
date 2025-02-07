import DrinkRegisterForm from "@/components/dashboard/drink/drink-register-form";
import SidebarBreadcrumb from "@/components/dashboard/sidebar-breadcrumb";
import { SidebarTrigger } from "@/components/dashboard/sidebar-trigger";
import { Separator } from "@/components/ui/separator";
import { SidebarInset } from "@/components/ui/sidebar";
import { CupSoda } from "lucide-react";

export default function BebidasRegisterPage() {
  return (
    <>
      <SidebarInset className="bg-bg">
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4 mx-4 shadow-lg border border-border-pizza rounded-md">
            <SidebarTrigger />
            <Separator
              className="mr-2 h-6 bg-separator-pizza"
              orientation="vertical"
            />
            <SidebarBreadcrumb />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 pb-8 pt-5 px-8 md:p-16 md:pt-9">
          <div className="text-xl border-l-2 border-orange-pizza pl-2">
            Cadastro de
            <div className="text-3xl font-semibold flex gap-x-1 items-center underline underline-offset-4">
              <CupSoda className="text-orange-pizza" /> Bebidas
            </div>
          </div>
          <DrinkRegisterForm />
        </div>
      </SidebarInset>
    </>
  );
}
