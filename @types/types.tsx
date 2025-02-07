import { Role, User } from "@prisma/client";
import { JWTPayload } from "jose";
import { Dispatch, SetStateAction } from "react";

export interface IProduct {
  name: string;
  image: string;
  price: number;
  type?: ProductTypes;
  description?: string;
  index?: number;
}

export interface IProductCard extends IProduct {
  index: number;
}

export interface INavItem extends IChildren {
  href: string;
}

export interface ICategory {
  value: string;
  label: string;
  icon: any;
}

export type PizzaSize = "P" | "M" | "G" | "GG";
export enum PizzaSizeEnum {
  P = "P",
  M = "M",
  G = "G",
  GG = "GG",
}

export type DrinkSize = "2L" | "1L" | "Lata";

export type ProductTypes = "Pizza" | "Drink";

export type Sizes = PizzaSize | DrinkSize;

export interface ICartSizeCardButton {
  size: Sizes;
}

export interface ISizeContext {
  itemSize: Sizes | undefined;
  setItemSize: Dispatch<SetStateAction<Sizes | undefined>>;
  quantity: number;
  setQuantity: Dispatch<SetStateAction<number>>;
}

export interface ICartContext {
  cart: ICartItem[];
  setCart: Dispatch<SetStateAction<ICartItem[]>>;
}

export interface ICartItem extends IProduct {
  id: string;
  quantity: number;
  size?: Sizes;
}

export interface IChildren {
  children: React.ReactNode;
}

export interface IHomeBanner {
  href?: string;
  src: string;
  className?: string;
}

export type IUserUpdate = User & { newPassword: string };

export interface ISidebarItem {
  title: string;
  url: string;
  icon?: any;
  sub_group?: ISidebarItem[];
}

export interface IUserPayload extends JWTPayload {
  email: string;
  name: string;
  role: Role;
}

export const UserRoleLabel = {
  ADMIN: "Administrador",
  USER: "Usuário",
  OPERATOR: "Operador",
} as const;

export const StatusOrderLabel = {
  PENDING: "Pendente",
  DELIVERED: "Entregue",
  CANCELED: "Cancelado",
} as const;

export type ITableUser = Pick<
  User,
  "id" | "name" | "email" | "role" | "createdAt" | "address" | "ordersId"
>;

export const UserTableColum = {
  role: "Cargo",
  email: "Email",
} as const;
