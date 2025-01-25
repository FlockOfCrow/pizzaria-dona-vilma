import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/carousel/cart-context";
import { SizeProvider } from "@/context/carousel/size-context";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pizzaria Dona Vilma",
  description: "A melhor receita de felicidade em cada fatia!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className={`${montserrat.variable} antialiased`}>
        <CartProvider>{children}</CartProvider>
        <Toaster closeButton={true} richColors />
      </body>
    </html>
  );
}
