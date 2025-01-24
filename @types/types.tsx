export interface ICarouselCard {
  index: number;
  image: string;
  title: string;
  description: string;
}

export interface IProduct {
  name: string;
  image: string;
  price: string;
}

export interface IPizza extends IProduct {
  description: string;
}

export interface INavItem {
  children: React.ReactNode;
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
  setItemSize: (size: PizzaSize) => void;
  quantity: number;
  setQuantity: (quantity: number) => void;
}
