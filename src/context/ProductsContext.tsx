import { Product } from "@/types";
import { createContext } from "react"; // this is a function that creates a context to store data in it so any component can reach the data from it directly

export type ProductsContextType = {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>; //this is a setter (function changes the state) and the data that will be sent to it must be an array of Products
  filteredProducts: Product[];
  setFilteredProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  sortType: "asc" | "desc";
  setSortType: React.Dispatch<React.SetStateAction<"asc" | "desc">>;
  offline: boolean;
  setOffline: React.Dispatch<React.SetStateAction<boolean>>;
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
  error: string | null;
  SetError: React.Dispatch<React.SetStateAction<string | null>>;
  retryFetch: () => void;
};

export const ProductsContext = createContext<ProductsContextType>({
  products: [],
  filteredProducts: [],
  sortType: "asc",
  setSortType: () => {},
  setProducts: () => {},
  setFilteredProducts: () => {},
  offline: false,
  setOffline: () => {},
  selectedCategory: "",
  setSelectedCategory: () => {},
  error: null,
  SetError: () => {},
  retryFetch: () => {},
});

//ProductsContext this is the name of the context
// the last line when it creates the context it automatically create with it a provider for this context
