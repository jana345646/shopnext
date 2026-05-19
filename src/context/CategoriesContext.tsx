import { createContext } from "react";
import { Category } from "@/types";

type CategoryContextType = {
  category: Category;
  SetCategory: React.Dispatch<React.SetStateAction<Category>>;
  error: boolean;
  SetError: React.Dispatch<React.SetStateAction<boolean>>;
};

export const CategoryContext = createContext<CategoryContextType | null>(null);
