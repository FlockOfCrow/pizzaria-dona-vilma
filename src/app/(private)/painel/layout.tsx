import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { verifyToken } from "@/modules/auth/auth-service";
import { getUser } from "@/modules/user/user-service";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Pizzaria Dona Vilma - Painel",
  description: "A melhor receita de felicidade em cada fatia!",
};

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const token = cookieStore.get("session")?.value;
  if (!token) redirect("/login");
  const session = await verifyToken(token);
  if (!session) redirect("/login");

  const user = await getUser(session.email);
  if (!user || user.error || user.user?.role !== "ADMIN") redirect("/login");

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="bg-bg w-full">{children}</main>
    </SidebarProvider>
  );
}
