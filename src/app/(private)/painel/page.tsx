import { ChartOrder } from "@/components/dashboard/home/chart-orders";
import ChartSells from "@/components/dashboard/home/chart-sells";
import ChartUser from "@/components/dashboard/home/chart-users";
import SidebarBreadcrumb from "@/components/dashboard/sidebar-breadcrumb";
import { SidebarTrigger } from "@/components/dashboard/sidebar-trigger";
import { Separator } from "@/components/ui/separator";
import { SidebarInset } from "@/components/ui/sidebar";

export default function Dashboard() {
  return (
    <>
      <SidebarInset className="bg-bg">
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4 ml-4 shadow-lg border border-border-pizza rounded-md">
            <SidebarTrigger />
            <Separator
              className="mr-2 h-4 bg-separator-pizza"
              orientation="vertical"
            />
            <SidebarBreadcrumb />
          </div>
        </header>
        <div className="flex justify-center flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3 p-4">
            <ChartUser />
            <ChartOrder />
            <ChartSells />
          </div>
        </div>
      </SidebarInset>
    </>
  );
}
