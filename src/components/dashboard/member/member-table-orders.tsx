import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import formatName from "@/utils/format-name";
import { Order } from "@prisma/client";
import { ITableUser, StatusOrderLabel } from "../../../../@types/types";

const orders: Order[] = [
  {
    id: "1031031",
    createdAt: new Date(),
    updatedAt: new Date(),
    status: "PENDING",
    productsId: ["1", "2", "3"],
    userId: "1",
  },
  {
    id: "e289e128947",
    createdAt: new Date(),
    updatedAt: new Date(),
    status: "PENDING",
    productsId: ["1", "2", "3"],
    userId: "1",
  },
  {
    id: "5125215",
    createdAt: new Date(),
    updatedAt: new Date(),
    status: "DELIVERED",
    productsId: ["1", "2", "3"],
    userId: "1",
  },
  {
    id: "1221421",
    createdAt: new Date(),
    updatedAt: new Date(),
    status: "PENDING",
    productsId: ["1", "2", "3"],
    userId: "1",
  },
  {
    id: "62156124",
    createdAt: new Date(),
    updatedAt: new Date(),
    status: "CANCELED",
    productsId: ["1", "2", "3"],
    userId: "1",
  },
];

export default function MemberTableOrders({
  selectedUser,
}: {
  selectedUser: ITableUser;
}) {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          Pedidos de{" "}
          <span className="bg-border-pizza p-1 px-2 bg-opacity-60 rounded-lg cursor-pointer hover:bg-separator-pizza transition duration-200">
            {formatName(selectedUser?.name ?? "Usuário")}
          </span>
        </DialogTitle>
      </DialogHeader>
      <div className="grid grid-cols-1 gap-y-2">
        {orders.map((order) => (
          <div className="bg-bg p-2 relative shadow-lg">
            <div>
              <span className="text-sm font-semibold"> - Pedido:</span>{" "}
              {order.id}
            </div>
            <div>
              <span className="text-sm font-semibold"> - Produtos:</span>{" "}
              {order.productsId.join(", ")}
            </div>
            <div className="flex gap-x-1 items-center">
              <div>
                <span className="text-sm font-semibold"> - Status:</span>{" "}
                <span
                  className={`text-decoration-none font-semibold ${
                    order.status === "PENDING"
                      ? "text-orange-600"
                      : order.status === "DELIVERED"
                      ? "text-green-700"
                      : "text-red-600"
                  }`}
                >
                  {StatusOrderLabel[order.status]}
                </span>
                <div className="pt-2 text-sm font-light">
                  {order.createdAt.toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </DialogContent>
  );
}
