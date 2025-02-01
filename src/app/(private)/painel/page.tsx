import SidebarBreadcrumb from "@/components/dashboard/sidebar-breadcrumb";
import { SidebarTrigger } from "@/components/dashboard/sidebar-trigger";
import { Separator } from "@/components/ui/separator";
import { SidebarInset } from "@/components/ui/sidebar";

export default async function Dashboard() {
  return (
    <>
      <SidebarInset className="bg-bg">
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4 ml-4 bg-fbg rounded-md">
            <SidebarTrigger />
            <Separator
              className="mr-2 h-4 bg-separator-pizza"
              orientation="vertical"
            />
            <SidebarBreadcrumb />
          </div>
        </header>
      </SidebarInset>
    </>
  );
}
