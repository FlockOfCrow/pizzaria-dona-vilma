"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@radix-ui/react-collapsible";
import {
  ChevronDown,
  CupSoda,
  NotepadText,
  Pizza,
  User,
  UtensilsCrossed,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ISidebarItem } from "../../../@types/types";
import { usePathname } from "next/navigation";

const URL_REF = "/painel";

const items: ISidebarItem[] = [
  {
    title: "Pedidos",
    url: URL_REF + "/pedidos",
    icon: NotepadText,
  },
  {
    title: "Cardápio",
    url: "#",
    icon: UtensilsCrossed,
    sub_group: [
      {
        title: "Pizzas",
        url: URL_REF + "/",
        icon: Pizza,
        sub_group: [
          {
            title: "Cadastrar Pizza",
            url: URL_REF + "/pizzas/cadastrar",
          },
          {
            title: "Remover Pizza",
            url: URL_REF + "/pizzas/remover",
          },
          {
            title: "Editar Pizza",
            url: URL_REF + "/pizzas/editar",
          },
        ],
      },
      {
        title: "Bebidas",
        url: URL_REF + "/",
        icon: CupSoda,
        sub_group: [
          {
            title: "Cadastrar Bebida",
            url: URL_REF + "/bebidas/cadastrar",
          },
          {
            title: "Remover Bebida",
            url: URL_REF + "/bebidas/remover",
          },
          {
            title: "Editar Bebida",
            url: URL_REF + "/bebidas/editar",
          },
        ],
      },
    ],
  },
  {
    title: "Membros",
    url: URL_REF + "/membros",
    icon: User,
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  const currentPath = pathname.split("/")[2];
  return (
    <Sidebar collapsible="icon" className="">
      <SidebarHeader className="bg-fbg justify-center items-center">
        <Link href={"/"}>
          <Image src="/logo02.png" alt="logo02" width={500} height={500} />
        </Link>
      </SidebarHeader>
      <SidebarContent className="bg-fbg p-4">
        <SidebarMenu className="bg-bg rounded-md">
          {items.map((item, index) =>
            item.sub_group?.length ?? 0 > 0 ? (
              <Collapsible
                defaultOpen={false}
                key={index}
                className="group/collapsible"
              >
                <SidebarGroup>
                  <SidebarGroupLabel
                    className="text-black font-semibold text-lg"
                    asChild
                  >
                    <CollapsibleTrigger
                      className={`gap-x-1 hover:bg-gray-400/25 !transition !duration-150 ${
                        currentPath === item.title.toLowerCase()
                          ? "bg-gray-400/25"
                          : ""
                      }`}
                    >
                      {item.icon && (
                        <item.icon className="text-orange-pizza stroke-[2.5px]" />
                      )}
                      {item.title}
                      <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                    </CollapsibleTrigger>
                  </SidebarGroupLabel>
                  <CollapsibleContent>
                    {item.sub_group?.map((sub_item, sub_index) => (
                      <Collapsible
                        defaultOpen={false}
                        key={sub_index}
                        className="group/collapsible-1"
                      >
                        <SidebarGroup>
                          <SidebarGroupLabel
                            className="text-black text-lg"
                            asChild
                          >
                            <CollapsibleTrigger
                              className={`gap-x-1 hover:bg-gray-400/25 !transition !duration-150 ${
                                currentPath === sub_item.title.toLowerCase()
                                  ? "bg-gray-400/25"
                                  : ""
                              }`}
                            >
                              {sub_item.icon && (
                                <sub_item.icon className="text-orange-pizza" />
                              )}
                              {sub_item.title}
                              <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible-1:rotate-180" />
                            </CollapsibleTrigger>
                          </SidebarGroupLabel>
                          <CollapsibleContent>
                            {sub_item.sub_group?.map(
                              (sub_sub_item, sub_sub_index) => (
                                <SidebarGroup key={sub_sub_index}>
                                  <CollapsibleTrigger
                                    className={`gap-x-1 hover:text-button-pizza transition duration-150 rounded-md ${
                                      currentPath ===
                                      sub_sub_item.title.toLowerCase()
                                        ? "bg-gray-400/25"
                                        : ""
                                    }`}
                                  >
                                    <Link href={sub_sub_item.url}>
                                      {sub_sub_item.icon && (
                                        <sub_sub_item.icon />
                                      )}
                                      {sub_sub_item.title}
                                    </Link>
                                  </CollapsibleTrigger>
                                </SidebarGroup>
                              )
                            )}
                          </CollapsibleContent>
                        </SidebarGroup>
                      </Collapsible>
                    ))}
                  </CollapsibleContent>
                </SidebarGroup>
              </Collapsible>
            ) : (
              <SidebarGroup key={item.title}>
                <SidebarGroupLabel
                  asChild
                  className={`text-black font-semibold text-lg hover:bg-gray-400/25 transition duration-100 ${
                    currentPath === item.title.toLowerCase()
                      ? "bg-gray-400/25"
                      : ""
                  }`}
                >
                  <Link className="gap-x-1" href={item.url}>
                    {item.icon && (
                      <item.icon className="text-orange-pizza stroke-[2.5px] flex" />
                    )}
                    {item.title}{" "}
                  </Link>
                </SidebarGroupLabel>
              </SidebarGroup>
            )
          )}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="bg-fbg" />
    </Sidebar>
  );
}
