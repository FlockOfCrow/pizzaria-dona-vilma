"use server";

import prisma from "@/lib/prisma";
import { z } from "zod";
import { registerDrinkSchema } from "../../../@types/drink";
import { registerPizzaSchema } from "../../../@types/pizza";

export async function createPizza(
  pizza: Omit<z.infer<typeof registerPizzaSchema>, "picture"> & {
    image: string;
  }
) {
  try {
    const newPizza = await prisma.product.create({
      data: {
        name: pizza.name,
        description: pizza.description,
        price: pizza.price,
        image: pizza.image,
        category: "PIZZA",
      },
    });
    if (!newPizza) {
      throw new Error("Pizza has already been created");
    }
    return { pizza: newPizza };
  } catch (error: any) {
    if (error.code === "P2002") {
      return { error: "Esse email já está cadastrado" };
    }
    return { error: error.message };
  }
}

export async function getPizzas(search?: string) {
  try {
    const pizzas = await prisma.product.findMany({
      where: {
        category: "PIZZA",
        OR: [
          { name: { contains: search, mode: "insensitive" } },
          { description: { contains: search, mode: "insensitive" } },
        ],
      },
    });
    const totalPizzas = await prisma.product.count({
      where: {
        category: "PIZZA",
        OR: [
          { name: { contains: search, mode: "insensitive" } },
          { description: { contains: search, mode: "insensitive" } },
        ],
      },
    });
    if (!pizzas) {
      throw new Error("No pizzas found");
    }
    return { pizzas, total: totalPizzas };
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function editPizza(
  pizza: Omit<z.infer<typeof registerPizzaSchema>, "picture"> & {
    image: string;
  }
) {
  try {
    const updatedPizza = await prisma.product.update({
      where: {
        name: pizza.name,
      },
      data: {
        description: pizza.description,
        price: pizza.price,
        image: pizza.image,
      },
    });
    if (!updatedPizza) {
      throw new Error("Pizza not found");
    }
    return { pizza: updatedPizza };
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function createDrink(
  drink: Omit<z.infer<typeof registerDrinkSchema>, "picture"> & {
    image: string;
  }
) {
  try {
    const newDrink = await prisma.product.create({
      data: {
        name: drink.name,
        description: drink.description,
        price: drink.price,
        image: drink.image,
        category: "DRINK",
      },
    });
    if (!newDrink) {
      throw new Error("Drink has already been created");
    }
    return { drink: newDrink };
  } catch (error: any) {
    if (error.code === "P2002") {
      return { error: "Esse email já está cadastrado" };
    }
    return { error: error.message };
  }
}

export async function getDrinks() {
  try {
    const drinks = await prisma.product.findMany({
      where: {
        category: "DRINK",
      },
    });
    if (!drinks) {
      throw new Error("No drinks found");
    }
    return { drinks };
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function getProductByName(name: string) {
  try {
    const product = await prisma.product.findUnique({
      where: {
        name,
      },
    });
    if (!product) {
      throw new Error("Product not found");
    }
    return { product };
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function getTotalProductSoldByMonth(month: string, year?: string) {
  try {
    const now = new Date();
    const targetYear = year ? parseInt(year, 10) : now.getFullYear();
    const targetMonth = parseInt(month, 10) - 1; // meses baseados em zero
    const startDate = new Date(targetYear, targetMonth, 1);
    const endDate = new Date(targetYear, targetMonth + 1, 1);

    const orders = await prisma.order.findMany({
      where: {
        createdAt: {
          gte: startDate,
          lt: endDate,
        },
      },
    });
    const totalSold = orders.reduce(
      (sum, order) => sum + order.productsId.length,
      0
    );

    return { totalSold };
  } catch (error: any) {
    return { error: error.message };
  }
}
