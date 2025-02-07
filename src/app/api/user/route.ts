import { verifyToken } from "@/modules/auth/auth-service";
import { editUser, getUser } from "@/modules/user/user-service";
import Cache from "@/utils/cache";
import { NextRequest, NextResponse } from "next/server";
import { IUserUpdate } from "../../../../@types/types";
import {
  userUpdateSchema,
  userUpdateSchemaAdmin,
} from "../../../../@types/user";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("session");
  try {
    const session = await verifyToken(token?.value!);
    if (!session) throw new Error("Invalid token");
    const user = await getUser(session.email as string);
    if (!user) throw new Error("User not found");
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: "You are not authenticated",
      },
      { status: 401 }
    );
  }
}

const userCache = new Map<string, Cache>();

export async function PATCH(req: NextRequest) {
  const token = req.cookies.get("session");
  try {
    const body = await req.json();
    
    const parsedBody = userUpdateSchema.safeParse(body);
    if (!parsedBody.success) {
      return NextResponse.json(
        {
          message: "Invalid request body",
          errors: parsedBody.error.errors,
        },
        { status: 400 }
      );
    }
    const session = await verifyToken(token?.value!);
    if (!session) throw new Error("Invalid token");

    const time = 60;

    const userId = session.sub as string;
    if (!userCache.has(userId)) {
      userCache.set(userId, new Cache(time));
    }
    const cache = userCache.get(userId);
    const lastUpdate = cache?.get<number>("lastUpdate");
    const now = Date.now();
    if (lastUpdate && now - lastUpdate < time * 1000) {
      return NextResponse.json(
        {
          message: "You can only update your profile once per hour.",
        },
        { status: 429 }
      );
    }

    const user = await editUser(parsedBody.data as IUserUpdate);
    if (user.error)
      return NextResponse.json({ message: user.error }, { status: 400 });

    cache?.set("lastUpdate", now);

    return NextResponse.json(
      {
        message: "User updated successfully",
        user: {
          id: user.user?.id,
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
