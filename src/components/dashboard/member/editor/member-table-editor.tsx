"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import formatName from "@/utils/format-name";
import { Role } from "@prisma/client";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Row } from "@tanstack/react-table";
import { ChevronDown } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "sonner";
import { ITableUser, UserRoleLabel } from "../../../../../@types/types";

export default function MemberTableEditor({
  row,
  onRoleUpdate,
}: {
  row: Row<ITableUser>;
  onRoleUpdate: (userId: string, role: Role) => void;
}) {
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState<Role | null>(null);

  const selectedRole = (role: Role) => {
    setOpen(true);
    setRole(role);
  };

  const confirmButton = async () => {
    setOpen(false);
    const request = fetch("/api/user/" + row.original.id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: row.original.id,
        role: role,
        type: "edit",
      }),
    });

    toast.promise(request, {
      loading: "Salvando alterações...",
      success: () => {
        setRole(null);
        onRoleUpdate(row.original.id, role!);
        return "Cargo alterado com sucesso!";
      },
      error: "Erro ao alterar cargo.",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="ml-auto bg-fbg border-0 hover:bg-border-pizza shadow-none"
          >
            {UserRoleLabel[row.getValue("role") as keyof typeof UserRoleLabel]}{" "}
            <ChevronDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="bg-bg border-separator-pizza shadow-lg"
          align="end"
        >
          <DropdownMenuLabel>Alterar Cargo</DropdownMenuLabel>
          <DropdownMenuItem
            className="focus:bg-border-pizza"
            onClick={(e: any) => selectedRole(e.target.id as Role)}
            id="ADMIN"
            disabled={
              UserRoleLabel[
                row.getValue("role") as keyof typeof UserRoleLabel
              ] === "Administrador"
            }
          >
            Administrador
          </DropdownMenuItem>
          <DropdownMenuItem
            className="focus:bg-border-pizza"
            onClick={(e: any) => selectedRole(e.target.id as Role)}
            id="OPERATOR"
            disabled={
              UserRoleLabel[
                row.getValue("role") as keyof typeof UserRoleLabel
              ] === "Operador"
            }
          >
            Operador
          </DropdownMenuItem>
          <DropdownMenuItem
            className="focus:bg-border-pizza"
            onClick={(e: any) => selectedRole(e.target.id as Role)}
            id="USER"
            disabled={
              UserRoleLabel[
                row.getValue("role") as keyof typeof UserRoleLabel
              ] === "Usuário"
            }
          >
            Usuário
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Deseja alterar o cargo?</DialogTitle>
          <DialogDescription className="text-sm text-gray-600">
            Sempre confira os dados antes de confirmar.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-2">
          <div>
            Você está prestes a alterar o cargo de{" "}
            <span className="underline text-orange-pizza font-semibold">
              {formatName(row.original.name).split(" ")[0]}
            </span>{" "}
            para{" "}
            <span className="underline font-semibold">
              {UserRoleLabel[role as keyof typeof UserRoleLabel]}
            </span>
            .
          </div>
          <div>
            <div>- Nome: {formatName(row.original.name)}</div>
            <div>- Email: {row.original.email}</div>
            <div>- Cargo atual: {UserRoleLabel[row.original.role]}</div>
            <div>
              - Cargo a confirmar:{" "}
              {UserRoleLabel[role as keyof typeof UserRoleLabel]}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={confirmButton}
            className="bg-button-pizza hover:bg-button-hover-pizza"
          >
            Confirmar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
