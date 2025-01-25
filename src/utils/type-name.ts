import { ProductTypes, Sizes } from "../../@types/types";

export function nameSize(size?: Sizes) {
  return size === "P"
    ? "Pequena"
    : size === "M"
    ? "Média"
    : size === "G"
    ? "Grande"
    : size === "GG"
    ? "Gigante"
    : size === "Lata"
    ? "Lata"
    : size === "2L"
    ? "2 Litros"
    : size === "1L"
    ? "1 Litro"
    : "";
}

export function nameType(type?: ProductTypes) {
  return type === "Pizza"
    ? "Pizza"
    : type === "Drink"
    ? ""
    : type === "Dessert"
    ? "Doce"
    : "Pizza";
}
