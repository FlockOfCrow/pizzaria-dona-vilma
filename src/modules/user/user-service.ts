import prisma from "@/lib/prisma";
import { IUserUpdate } from "../../../@types/types";
import { comparePassword, cryptoPassword } from "../auth/auth-service";

export async function getUser(email: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) throw new Error("User not found");
    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        address: user.address,
        role: user.role,
      },
    };
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function editUser(user: IUserUpdate) {
  try {
    const { id, email, newPassword, ...userRest } = user;
    const findUser = await prisma.user.findUnique({
      where: { id },
    });
    if (!findUser) throw new Error("User not found");
    if (email) {
      const emailExists = await prisma.user.findUnique({
        where: { email },
      });
      if (emailExists && emailExists.id !== id) {
        throw new Error("Email already in use");
      }
    }
    let updatedData = { ...userRest, email };
    if (user.password && newPassword) {
      const pass = await comparePassword(user.password, findUser.password);
      if (!pass) throw new Error("Invalid password");
      const encrypt = await cryptoPassword(newPassword);
      updatedData = { ...updatedData, password: encrypt };
    }
    const updateUser = await prisma.user.update({
      where: { id },
      data: updatedData,
    });
    if (!updateUser) throw new Error("Error updating user");
    return { user: updateUser };
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function getUsersSizeByMonth(month: string, year?: string) {
  try {
    const now = new Date();
    const targetYear = year ? parseInt(year, 10) : now.getFullYear();
    const targetMonth = parseInt(month, 10) - 1;
    const startDate = new Date(targetYear, targetMonth, 1);
    const endDate = new Date(targetYear, targetMonth + 1, 1);
    const users = await prisma.user.count({
      where: {
        createdAt: {
          gte: startDate,
          lt: endDate,
        },
      },
    });
    return { users };
  } catch (error: any) {
    return { error: error.message };
  }
}
