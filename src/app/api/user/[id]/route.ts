import { verifyToken } from "@/modules/auth/auth-service";
import { editUser, getUser } from "@/modules/user/user-service";
import { NextRequest, NextResponse } from "next/server";
import { IUserUpdate } from "../../../../../@types/types";
import { userUpdateSchemaAdmin } from "../../../../../@types/user";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const token = req.cookies.get("session");
  try {
    const body = await req.json();
    if (!params.id || params.id.length === 0) {
      return NextResponse.json(
        {
          message: "Invalid request",
        },
        { status: 400 }
      );
    }

    const session = await verifyToken(token?.value!);
    if (!session) throw new Error("Invalid token");
    if (session.role !== "ADMIN") {
      return NextResponse.json(
        { message: "Você não tem permissão para acessar esta rota" },
        { status: 403 }
      );
    }

    const user = await getUser(session.email as string);
    if (!user) throw new Error("Usuário não encontrado");
    if (user.user?.role !== "ADMIN") {
      return NextResponse.json(
        { message: "Você não tem permissão para acessar esta rota" },
        { status: 403 }
      );
    }

    const parsedBody = userUpdateSchemaAdmin.safeParse(body);
    if (!parsedBody.success) {
      return NextResponse.json(
        {
          message: "Invalid request body",
          errors: parsedBody.error.errors,
        },
        { status: 400 }
      );
    }

    const newUser = await editUser(parsedBody.data as unknown as IUserUpdate);
    if (newUser.error) {
      return NextResponse.json({ message: newUser.error }, { status: 400 });
    }
    return NextResponse.json(
      {
        message: "User updated successfully",
        user: {
          id: newUser.user?.id,
          role: newUser.user?.role,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "You are not authenticated",
      },
      { status: 401 }
    );
  }
}
