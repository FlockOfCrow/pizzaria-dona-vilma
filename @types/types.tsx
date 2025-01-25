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
  type?: ProductTypes;
  description?: string;
}

export interface IProductCard extends IProduct {
  index: number;
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

export type PizzaSize = "P" | "M" | "G" | "GG";

export type DrinkSize = "2L" | "1L" | "Lata";

export type ProductTypes = "Pizza" | "Drink" | "Dessert";

export type Sizes = PizzaSize | DrinkSize;

export interface ICartSizeCardButton {
  size: Sizes;
}

export interface ISizeContext {
  itemSize: PizzaSize | null;
  setItemSize: Dispatch<SetStateAction<Sizes | null>>;
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

export interface IHomeBanner {
  href?: string;
  src: string;
  className?: string;
}
