import { verifyToken } from "@/modules/auth/auth-service";
import { getUser, getUsersSizeByMonth } from "@/modules/user/user-service";
import { NextRequest, NextResponse } from "next/server";
import { userQuerySchema } from "../../../../@types/users";

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
    const queryParams = {
      month: searchParams.get("month") ?? "",
      year: searchParams.get("year") ?? undefined,
    };

    const parsedQuery = userQuerySchema.safeParse(queryParams);
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
