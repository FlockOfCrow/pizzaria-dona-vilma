import prisma from "@/lib/prisma";
import { z } from "zod";
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

export async function getPizzas() {
  try {
    const pizzas = await prisma.product.findMany({
      where: {
        category: "PIZZA",
      },
    });
    if (!pizzas) {
      throw new Error("No pizzas found");
    }
    return { pizzas };
  } catch (error: any) {
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
