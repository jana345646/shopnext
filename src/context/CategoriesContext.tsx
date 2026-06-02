import { createContext } from "react";
import { Category } from "@/types";

export type CategoryContextType = {
  category: Category[];
  SetCategory: React.Dispatch<React.SetStateAction<Category[]>>;
  error: string | null;
  SetError: React.Dispatch<React.SetStateAction<string | null>>;
};

export const CategoryContext = createContext<CategoryContextType>({
  category: [],
  SetCategory: () => {},
  error: null,
  SetError: () => {},
});
