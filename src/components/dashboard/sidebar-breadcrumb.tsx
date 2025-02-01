"use client";

import { HomeIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";

export default function SidebarBreadcrumb() {
  const pathname = usePathname();
  const paths = pathname.split("/").filter(Boolean);
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className="">
          <BreadcrumbLink
            className="text-black hover:text-orange-pizza"
            href="/"
          >
            <HomeIcon className="w-4 h-4" />
          </BreadcrumbLink>
        </BreadcrumbItem>
        {paths.map((path, index) => {
          const href = `/${paths.slice(0, index + 1).join("/")}`;
          const isLast = index === path.length - 1;
          return (
            <>
              <BreadcrumbSeparator className="text-black" />
              <BreadcrumbItem key={index}>
                <BreadcrumbLink
                  className={`text-black hover:text-orange-pizza ${
                    isLast ? "font-bold" : ""
                  }`}
                  href={href}
                >
                  {path.charAt(0).toUpperCase() + path.slice(1)}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
