import { createContext, useContext, useState } from "react";
import { ISizeContext, PizzaSize } from "../../../@types/types";

const SizeContext = createContext<ISizeContext | undefined>(undefined);

export const SizeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [itemSize, setItemSize] = useState<PizzaSize | null>(null);
  const [quantity, setQuantity] = useState(1);

  return (
    <SizeContext.Provider
      value={{ itemSize, setItemSize, quantity, setQuantity }}
    >
      {children}
    </SizeContext.Provider>
  );
};

export const useSize = () => {
  const context = useContext(SizeContext);
  if (!context) {
    throw new Error("useSize must be used within a SizeProvider");
  }
  return context;
};
