import { verifyToken } from "@/modules/auth/auth-service";
import { createPizza } from "@/modules/product/product-service";
import { promises as fs } from "fs";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { registerPizzaSchema } from "../../../../@types/pizza";

function sanitizeFileName(fileName: string): string {
  return path.basename(fileName).replace(/[^\w\d\-.]/g, "_");
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

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
