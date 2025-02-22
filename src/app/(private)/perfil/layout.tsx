import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pizzaria Dona Vilma - Perfil",
  description: "A melhor receita de felicidade em cada fatia!",
};

export default function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
