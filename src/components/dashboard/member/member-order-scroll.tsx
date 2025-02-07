"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Order } from "@prisma/client";
import { useEffect, useRef, useState } from "react";
import { ITableUser, StatusOrderLabel } from "../../../../@types/types";

export default function MemberOrderScrollArea({
  selectedUser,
}: {
  selectedUser: ITableUser;
}) {
  const [page, setPage] = useState(0);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  async function fetchOrders(nextPage: number) {
    setIsLoading(true);
    const res = await fetch(
      `/api/orders?userId=${selectedUser.id}&limit=10&page=${nextPage}`
    );
    const data = await res.json();
    data?.orders && setOrders((prev) => [...prev, ...data?.orders]);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchOrders(page);
  }, [page]);

  function handleScroll() {
    if (!scrollRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    if (scrollTop + clientHeight >= scrollHeight - 20 && !isLoading) {
      setPage((prev) => prev + 1);
    }
  }

  return (
    <ScrollArea
      ref={scrollRef}
      onScroll={handleScroll}
      className="h-64 w-full p-2"
    >
      {orders?.length === 0
        ? "Nenhum pedido encontrado"
        : orders.map((order) => (
            <div key={order.id} className="bg-bg p-2 relative shadow-lg">
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
    </ScrollArea>
  );
}
