"use client";

import PizzaLoading from "@/components/loading/pizza-loading";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnDef,
  ColumnFiltersState,
  PaginationState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpDown,
  ChevronDown,
  Copy,
  MoreHorizontal,
  NotepadText,
  Pencil,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ITableUser, UserRoleLabel } from "../../../../@types/types";
import MemberTableOrders from "./member-table-orders";

export default function MemberTable() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const [data, setData] = useState<ITableUser[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });
  const [isLoading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<ITableUser | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/users?limit=${pagination.pageSize}&page=${
            pagination.pageIndex + 1
          }`
        );
        if (!res.ok) throw new Error("Falha ao buscar dados.");
        const result = await res.json();
        setData(result.users);
        setTotalCount(result.total);
        setLoading(false);
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, [pagination.pageIndex, pagination.pageSize]);

  const columns: ColumnDef<ITableUser>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "role",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="hover:bg-border-pizza text-black font-semibold"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Cargo
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="capitalize">
          {UserRoleLabel[row.getValue("role") as keyof typeof UserRoleLabel]}
        </div>
      ),
    },
    {
      accessorKey: "email",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="hover:bg-border-pizza text-black font-semibold"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Email
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("email")}</div>
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const user = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-8 w-8 p-0 hover:bg-border-pizza"
              >
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="bg-bg border-separator-pizza shadow-lg"
              align="end"
            >
              <DropdownMenuLabel>Ações</DropdownMenuLabel>
              <DropdownMenuItem
                className="focus:bg-border-pizza"
                onClick={() => {
                  navigator.clipboard.writeText(user.email);
                  toast.success("Email copiado para área de transferência.", {
                    description: user.email,
                  });
                }}
              >
                <Copy />
                Copiar Email
              </DropdownMenuItem>
              <DropdownMenuItem
                className="focus:bg-border-pizza"
                onClick={() => {
                  setOpen(true);
                  setSelectedUser(user);
                }}
              >
                <NotepadText />
                Visualizar pedidos
              </DropdownMenuItem>
              <DropdownMenuItem className="focus:bg-border-pizza">
                <Pencil />
                Editar membro
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      pagination,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    manualPagination: true,
    pageCount: Math.ceil(totalCount / pagination.pageSize),
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <MemberTableOrders selectedUser={selectedUser as ITableUser} />
      <div className="w-full">
        <div className="flex items-center py-4">
          {/* Adicionar outros filtros */}
          <Input
            placeholder="Filtrar por: email"
            value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("email")?.setFilterValue(event.target.value)
            }
            className="max-w-sm bg-fbg border-separator-pizza"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="ml-auto bg-fbg border-separator-pizza hover:bg-border-pizza"
              >
                Colunas <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="bg-fbg border-separator-pizza"
              align="end"
            >
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize bg-fbg border-separator-pizza focus:bg-border-pizza hover:bg-fbg"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="rounded-md border bg-fbg border-separator-pizza px-2">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow
                  className="hover:bg-transparent rounded-md border-separator-pizza"
                  key={headerGroup.id}
                >
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24">
                    <PizzaLoading />
                  </TableCell>
                </TableRow>
              ) : table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="border-separator-pizza data-[state=selected]:bg-border-pizza data-[state=selected]:border-separator-pizza"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    Nenhum resultado.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} de{" "}
            {table.getFilteredRowModel().rows.length} usuários(s) selecionados.
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="bg-fbg hover:bg-border-pizza border-border-pizza"
            >
              <ArrowLeft />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="bg-fbg hover:bg-border-pizza border-border-pizza"
            >
              <ArrowRight />
            </Button>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
