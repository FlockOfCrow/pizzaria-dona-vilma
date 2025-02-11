import { verifyToken } from "@/modules/auth/auth-service";
import {
  createPizza,
  editPizza,
  getPizzas,
  getProductByName,
  getTotalProductSoldByMonth,
} from "@/modules/product/product-service";
import { getUser } from "@/modules/user/user-service";
import { promises as fs } from "fs";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { registerPizzaSchema } from "../../../../@types/pizza";
import { monthQuerySchema, searchSchema } from "../../../../@types/query";

function sanitizeFileName(fileName: string): string {
  return path.basename(fileName).replace(/[^\w\d\-.]/g, "_");
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export async function GET(req: NextRequest) {
  const token = req.cookies.get("session");
  try {
    const { searchParams } = new URL(req.url);
    const queryParams = {
      month: searchParams.get("month") ?? "",
      year: searchParams.get("year") ?? undefined,
      limit: Number.parseInt(searchParams.get("limit") as string) ?? 10,
      page: Number.parseInt(searchParams.get("page") as string) ?? 1,
      search: searchParams.get("search") ?? "",
    };

    if (!queryParams.month && !queryParams.year) {
      const parsedQuery = searchSchema.safeParse({
        search: queryParams.search,
      });
      if (!parsedQuery.success) {
        const errorMessage = parsedQuery.error.errors
          .map((err) => err.message)
          .join(", ");
        return NextResponse.json({ message: errorMessage }, { status: 400 });
      }
      const { search } = parsedQuery.data;
      const result = await getPizzas(search);
      if (result.error) {
        return NextResponse.json({ message: result.error }, { status: 400 });
      }
      return NextResponse.json(result, { status: 200 });
    }

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

    const user = await getUser(session.email as string);
    if (!user) throw new Error("Usuário não encontrado");
    if (user.user?.role !== "ADMIN") {
      return NextResponse.json(
        { message: "Você não tem permissão para acessar esta rota" },
        { status: 403 }
      );
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
    const parsedBody = registerPizzaSchema.safeParse(data);
    if (!parsedBody.success) {
      return NextResponse.json(
        {
          message: "Invalid request body",
          errors: parsedBody.error.errors,
        },
        { status: 400 }
      );
    }

    const uploadDir = path.join(process.cwd(), "public", "pizzas", "upload");
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

    const imagePath = `/pizzas/upload/${uniqueName}`;

    const finalData = { ...parsedBody.data, image: imagePath };

    const pizza = await createPizza(finalData as any);
    if (pizza.error) {
      return NextResponse.json({ message: pizza.error }, { status: 400 });
    }
    return NextResponse.json(pizza);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const token = req.cookies.get("session");
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
    const parsedBody = registerPizzaSchema.safeParse(data);
    if (!parsedBody.success) {
      return NextResponse.json(
        {
          message: "Invalid request body",
          errors: parsedBody.error.errors,
        },
        { status: 400 }
      );
    }

    const uploadDir = path.join(process.cwd(), "public", "pizzas", "upload");
    try {
      await fs.access(uploadDir);
    } catch {
      await fs.mkdir(uploadDir, { recursive: true });
    }

    const fileName = sanitizeFileName(pictureFile.name).split("-");
    const safeFileName = sanitizeFileName(fileName[fileName.length - 1]);
    const uniqueName = `${Date.now()}-${safeFileName}`;
    const filePath = path.join(uploadDir, uniqueName);

    const findPizza = await getProductByName(name);
    if (findPizza.error) {
      return NextResponse.json({ message: findPizza.error }, { status: 400 });
    }

    if (findPizza?.product?.image) {
      const oldFileName = path.basename(findPizza.product.image);
      const oldFilePath = path.join(uploadDir, oldFileName);
      try {
        await fs.unlink(oldFilePath);
      } catch {}
    }

    const pictureBuffer = Buffer.from(await pictureFile.arrayBuffer());
    await fs.writeFile(filePath, pictureBuffer);

    const imagePath = `/pizzas/upload/${uniqueName}`;

    const finalData = { ...parsedBody.data, image: imagePath };

    const pizza = await editPizza(finalData as any);
    if (pizza.error) {
      return NextResponse.json({ message: pizza.error }, { status: 400 });
    }
    return NextResponse.json(pizza);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
