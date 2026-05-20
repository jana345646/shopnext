import { createContext } from "react";
import { Product } from "@/types";

export type ProductContextType = {
  product: Product | null;
};

export const ProductContext = createContext<ProductContextType>({
  product: null,
});
