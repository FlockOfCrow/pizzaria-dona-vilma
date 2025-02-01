import PizzaRegisterForm from "@/components/dashboard/pizza/pizza-register-form";
import SidebarBreadcrumb from "@/components/dashboard/sidebar-breadcrumb";
import { SidebarTrigger } from "@/components/dashboard/sidebar-trigger";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { SidebarInset } from "@/components/ui/sidebar";
import { Pizza } from "lucide-react";

export default function PizzaRegisterPage() {
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
        <div className="flex flex-1 flex-col gap-4 pt-4 px-8 md:p-16">
          <div className="text-xl border-l-2 border-orange-pizza pl-2">
            Cadastro de
            <div className="text-3xl font-semibold flex gap-x-1 items-center underline underline-offset-4">
              <Pizza className="text-orange-pizza" /> Pizza
            </div>
          </div>
          <PizzaRegisterForm />
        </div>
      </SidebarInset>
    </>
  );
}
