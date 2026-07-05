"use client";
import { createContext } from "react";
import { Product, Category } from "@/types";

type ProductsContextType = {
  products: Product[];
  loading: boolean;
  error: string | null;
  retry: () => void;
  filteredProducts: Product[];

  categories: Category[];
  categoriesError: string | null;

  offline: boolean;

  sortType: "asc" | "desc";
  setSortType: React.Dispatch<React.SetStateAction<"asc" | "desc">>;

  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
};

export const ProductsContext = createContext<ProductsContextType | null>(null);
