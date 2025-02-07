import { verifyToken } from "@/modules/auth/auth-service";
import { getOrderById } from "@/modules/order/order-service";
import { getUser } from "@/modules/user/user-service";
import { NextRequest, NextResponse } from "next/server";
import { userQuerySchemaWithUserId } from "../../../../@types/query";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("session");
  try {
    const session = await verifyToken(token?.value!);
    if (!session) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }
    const user = await getUser(session.email as string);
    if (!user) throw new Error("Usuário não encontrado");
    if (user.user?.role !== "ADMIN") {
      return NextResponse.json(
        { message: "Você não tem permissão para acessar esta rota" },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(req.url);
    const queryParams = {
      userId: searchParams.get("userId") ?? "",
      limit: Number(searchParams.get("limit")) || 10,
      page: Number(searchParams.get("page")) || 0,
    };

    const parsedQuery = userQuerySchemaWithUserId.safeParse(queryParams);
    if (!parsedQuery.success) {
      const errorMessage = parsedQuery.error.errors
        .map((err) => err.message)
        .join(", ");
      return NextResponse.json({ message: errorMessage }, { status: 400 });
    }

    const { userId, limit, page } = parsedQuery.data;

    const result = await getOrderById(userId, limit, page);
    if (result.error) {
      return NextResponse.json({ message: result.error }, { status: 400 });
    }
    return NextResponse.json(result.orders, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
