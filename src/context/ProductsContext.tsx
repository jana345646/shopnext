import { createContext } from "react"; // this is a function that creates a context to store data in it so any component can reach the data from it directly
import { Product } from "@/types";

type ProductsContextType = {
  // this is a type that define the type of the data that will be stored in this context
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>; //react.dispatch this is the type of the setproducts(a function that changes the value of the state)
  //React.SetStateAction it defines the type of the action(new data value) , so it's type must be product
  filteredProducts: Product[];
  setFilteredProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  sortType: "asc" | "desc";
  setSortType: React.Dispatch<React.SetStateAction<"asc" | "desc">>;
  loading: boolean;
  SetLoading: React.Dispatch<React.SetStateAction<boolean>>;
  error: boolean;
  SetError: React.Dispatch<React.SetStateAction<boolean>>;
  offline: boolean;
  SetOffline: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ProductsContext = createContext<ProductsContextType | null>(null);
//ProductsContext this is the name of the context
// type of the context could be ProductsContextType or null , but inially it is null
// the last line when it creates the context it automatically create with it a provider for this context
