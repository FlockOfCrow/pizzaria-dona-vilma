import { verifyToken } from "@/modules/auth/auth-service";
import {
  getUser,
  getUsers,
  getUsersSizeByMonth,
} from "@/modules/user/user-service";
import { NextRequest, NextResponse } from "next/server";
import {
  totalUserQuerySchema,
  userQuerySchema,
} from "../../../../@types/query";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("session");
  try {
    const session = await verifyToken(token?.value!);
    if (!session) throw new Error("Token inválido");

    const user = await getUser(session.email as string);
    if (!user) throw new Error("Usuário não encontrado");
    if (user.user?.role !== "ADMIN") {
      return NextResponse.json(
        { message: "Você não tem permissão para acessar esta rota" },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(req.url);
    let queryParams = {
      month: searchParams.get("month") ?? "",
      year: searchParams.get("year") ?? undefined,
      limit: Number.parseInt(searchParams.get("limit") as string) ?? 10,
      page: Number.parseInt(searchParams.get("page") as string) ?? 1,
    };

    if (!queryParams.month && !queryParams.year) {
      const parsedQuery = userQuerySchema.safeParse({
        limit: queryParams.limit,
        page: queryParams.page,
        search: searchParams.get("search") ?? "",
      });
      if (!parsedQuery.success) {
        const errorMessage = parsedQuery.error.errors
          .map((err) => err.message)
          .join(", ");
        return NextResponse.json({ message: errorMessage }, { status: 400 });
      }

      const { limit, page, search } = parsedQuery.data;

      const result = await getUsers(limit, page, search);
      if (result.error) {
        return NextResponse.json({ message: result.error }, { status: 400 });
      }
      return NextResponse.json(result, { status: 200 });
    }

    const parsedQuery = totalUserQuerySchema.safeParse({
      month: queryParams.month,
      year: queryParams.year,
    });

    if (!parsedQuery.success) {
      const errorMessage = parsedQuery.error.errors
        .map((err) => err.message)
        .join(", ");
      return NextResponse.json({ message: errorMessage }, { status: 400 });
    }

    const { month, year } = parsedQuery.data;

    const result = await getUsersSizeByMonth(month, year);
    if (result.error) {
      return NextResponse.json({ message: result.error }, { status: 400 });
    }

    return NextResponse.json(result.users, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Você não está autenticado" },
      { status: 401 }
    );
  }
}
