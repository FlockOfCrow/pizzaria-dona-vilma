import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pizzaria Dona Vilma - Painel",
  description: "A melhor receita de felicidade em cada fatia!",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="bg-bg w-full">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
