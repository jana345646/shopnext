import { createContext } from "react";
import { Product } from "@/types";

export type ProductContextType = {
  product: Product | null;
  setProduct: React.Dispatch<React.SetStateAction<Product | null>>;
  stepper: number;
  setStepper: React.Dispatch<React.SetStateAction<number>>;
  notFound: boolean;
  setNotFound: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ProductContext = createContext<ProductContextType | null>({
  product: null,
  setProduct: () => {},
  stepper: 1,
  setStepper: () => {},
  notFound: false,
  setNotFound: () => {},
});
