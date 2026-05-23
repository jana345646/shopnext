import { createContext } from "react";
import { Product } from "@/types";
export type FavoriteContextType = {
  favorite: Product[];
  SetFavorite: React.Dispatch<React.SetStateAction<boolean>>;
  toggleFavorite: (Product: Product) => void;
};

export const FavoriteContext = createContext<FavoriteContextType>({
  favorite: [],
  SetFavorite: () => {},
  toggleFavorite: () => {},
  isFavorite: false,
  SetIsFavorite: () => {},
});
