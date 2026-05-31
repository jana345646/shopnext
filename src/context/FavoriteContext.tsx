import { createContext } from "react";
import { Product } from "@/types";

export type FavoriteContextType = {
  favorite: Product[];
  SetFavorite: React.Dispatch<React.SetStateAction<Product[]>>;
  toggleFavorite: (product: Product) => void; // ⬅️ ضفنا دي عشان الـ TypeScript يشوفها
};

export const FavoriteContext = createContext<FavoriteContextType>({
  favorite: [],
  SetFavorite: () => {},
  toggleFavorite: () => {}, // ⬅️ ودي القيمة المبدئية ليها
});
