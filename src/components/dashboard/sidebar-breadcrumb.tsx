"use client";

import { HomeIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { Fragment } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const nonClickablePaths = ["/painel/pizzas"];

export default function SidebarBreadcrumb() {
  const pathname = usePathname();
  const paths = pathname.split("/").filter(Boolean);
  const maxVisibleItems = 1;
  const isNonClickablePath = (path: string) => nonClickablePaths.includes(path);
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink
            className="text-black hover:text-orange-pizza"
            href={pathname === "/painel" ? "/" : "/painel"}
          >
            <HomeIcon className="w-4 h-4" />
          </BreadcrumbLink>
        </BreadcrumbItem>
        {paths.length > maxVisibleItems ? (
          <>
            <BreadcrumbSeparator className="text-black" />
            <BreadcrumbItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <BreadcrumbLink className="text-black hover:text-orange-pizza cursor-pointer text-lg">
                    ...
                  </BreadcrumbLink>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {paths.slice(0, -maxVisibleItems).map((path, index) => {
                    const href = `/${paths.slice(0, index + 1).join("/")}`;
                    return (
                      <DropdownMenuItem key={index}>
                        <BreadcrumbLink
                          className="text-black hover:text-orange-pizza"
                          href={isNonClickablePath(href) ? "#" : href}
                        >
                          {path.charAt(0).toUpperCase() + path.slice(1)}
                        </BreadcrumbLink>
                      </DropdownMenuItem>
                    );
                  })}
                </DropdownMenuContent>
              </DropdownMenu>
            </BreadcrumbItem>
            {paths.slice(-maxVisibleItems).map((path, index) => {
              const href = `/${paths
                .slice(0, paths.length - maxVisibleItems + index + 1)
                .join("/")}`;
              const isLast = index === maxVisibleItems - 1;
              return (
                <Fragment key={index}>
                  <BreadcrumbSeparator className="text-black" />
                  <BreadcrumbItem>
                    <BreadcrumbLink
                      className={`text-black hover:text-orange-pizza ${
                        isLast ? "font-bold" : ""
                      }`}
                      href={href}
                    >
                      {path.charAt(0).toUpperCase() + path.slice(1)}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                </Fragment>
              );
            })}
          </>
        ) : (
          paths.map((path, index) => {
            const href = `/${paths.slice(0, index + 1).join("/")}`;
            const isLast = index === paths.length - 1;
            return (
              <Fragment key={index}>
                <BreadcrumbSeparator className="text-black" />
                <BreadcrumbItem>
                  <BreadcrumbLink
                    className={`text-black hover:text-orange-pizza ${
                      isLast ? "font-bold" : ""
                    }`}
                    href={href}
                  >
                    {path.charAt(0).toUpperCase() + path.slice(1)}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </Fragment>
            );
          })
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
