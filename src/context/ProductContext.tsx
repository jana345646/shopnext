import { createContext } from "react";
import { Product } from "@/types";

export type ProductContextType = {
  product: Product | null;
  SetProduct: React.Dispatch<React.SetStateAction<number>>;
  stepper: number;
  SetStepper: React.Dispatch<React.SetStateAction<number>>;
  notFound: boolean;
  setNotFound: React.Dispatch<React.SetStateAction<number>>;
};

export const ProductContext = createContext<ProductContextType>({
  product: null,
  SetProduct: () => {},
  stepper: 1,
  SetStepper: () => {},
  notFound: false,
  setNotFound: () => {},
});
