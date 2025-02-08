import { verifyToken } from "@/modules/auth/auth-service";
import {
  createDrink,
  getTotalProductSoldByMonth,
} from "@/modules/product/product-service";
import { getUser } from "@/modules/user/user-service";
import { promises as fs } from "fs";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { registerDrinkSchema } from "../../../../@types/drink";
import { monthQuerySchema } from "../../../../@types/query";

function sanitizeFileName(fileName: string): string {
  return path.basename(fileName).replace(/[^\w\d\-.]/g, "_");
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

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
      month: searchParams.get("month") ?? "",
      year: searchParams.get("year") ?? undefined,
    };

    const parsedQuery = monthQuerySchema.safeParse(queryParams);
    if (!parsedQuery.success) {
      const errorMessage = parsedQuery.error.errors
        .map((err) => err.message)
        .join(", ");
      return NextResponse.json({ message: errorMessage }, { status: 400 });
    }

    const { month, year } = parsedQuery.data;

    const result = await getTotalProductSoldByMonth(month, year);
    if (result.error) {
      return NextResponse.json({ message: result.error }, { status: 400 });
    }
    return NextResponse.json(result.totalSold, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get("session");
    const session = await verifyToken(token?.value!);
    if (!session) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    const formData = await req.formData();
    const name = formData.get("name")?.toString() || "";
    const description = formData.get("description")?.toString() || "";
    const priceString = formData.get("price")?.toString() || "{}";
    let price;
    try {
      price = JSON.parse(priceString);
    } catch (error) {
      return NextResponse.json({ message: "Preço inválido" }, { status: 400 });
    }

    const pictureFile = formData.get("picture") as File;
    if (!pictureFile) {
      return NextResponse.json(
        { message: "Imagem obrigatória" },
        { status: 400 }
      );
    }
    if (pictureFile.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { message: "Arquivo excede o tamanho máximo permitido (5MB)" },
        { status: 400 }
      );
    }

    const data = { name, description, price, picture: pictureFile };
    const parsedBody = registerDrinkSchema.safeParse(data);
    if (!parsedBody.success) {
      return NextResponse.json(
        {
          message: "Invalid request body",
          errors: parsedBody.error.errors,
        },
        { status: 400 }
      );
    }

    const uploadDir = path.join(process.cwd(), "public", "drinks", "upload");
    try {
      await fs.access(uploadDir);
    } catch {
      await fs.mkdir(uploadDir, { recursive: true });
    }

    const safeFileName = sanitizeFileName(pictureFile.name);
    const uniqueName = `${Date.now()}-${safeFileName}`;
    const filePath = path.join(uploadDir, uniqueName);

    const pictureBuffer = Buffer.from(await pictureFile.arrayBuffer());
    await fs.writeFile(filePath, pictureBuffer);

    const imagePath = `/drinks/upload/${uniqueName}`;

    const finalData = { ...parsedBody.data, image: imagePath };

    const drink = await createDrink(finalData as any);
    if (drink.error) {
      return NextResponse.json({ message: drink.error }, { status: 400 });
    }
    return NextResponse.json(drink);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
