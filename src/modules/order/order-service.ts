"use server";

import prisma from "@/lib/prisma";

export async function getOrderById(
  userId: string,
  limit: number,
  page: number
) {
  try {
    const orders = await prisma.order.findMany({
      take: limit,
      skip: page * limit,
      where: {
        userId,
      },
    });
    return { orders };
  } catch (error: any) {
    console.log(error.message);
    return { error: error.message };
  }
}
