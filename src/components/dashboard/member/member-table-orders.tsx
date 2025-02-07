import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import formatName from "@/utils/format-name";
import { ITableUser } from "../../../../@types/types";
import MemberOrderScrollArea from "./member-order-scroll";

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
        <MemberOrderScrollArea selectedUser={selectedUser} />
      </div>
    </DialogContent>
  );
}
