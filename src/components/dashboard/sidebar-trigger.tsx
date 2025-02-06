"use client";

import { useSidebar } from "@/components/ui/sidebar";
import { PanelLeft } from "lucide-react";

export function SidebarTrigger() {
  const { toggleSidebar } = useSidebar();

  return (
    <button
      className="hover:bg-gray-400/25 p-1 rounded-md transition duration-150"
      onClick={toggleSidebar}
    >
      <PanelLeft size={24} />
    </button>
  );
}
