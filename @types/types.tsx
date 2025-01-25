import { Dispatch, SetStateAction } from "react";

export interface ICarouselCard {
  index: number;
  image: string;
  title: string;
  description: string;
  price: number;
}

export interface IProduct {
  name: string;
  image: string;
  price: number;
  [key: string]: any;
}

export interface IPizza extends IProduct {
  description: string;
}

export interface INavItem extends IChildren {
  href: string;
}

export interface ICategory {
  value: string;
  label: string;
  icon: any;
}

export interface ICarouselSizeCartButton {
  size: string;
}

export type PizzaSize = "P" | "M" | "G" | "GG";

export interface ISizeContext {
  itemSize: PizzaSize | null;
  setItemSize: Dispatch<SetStateAction<PizzaSize | null>>;
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
}

export interface IChildren {
  children: React.ReactNode;
}
