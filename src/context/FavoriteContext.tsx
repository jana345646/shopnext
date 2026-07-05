import { createContext, Dispatch } from "react"; //Dispatch is a type in react for the dispatch as it defines that the dispatch takes an ction
import { FavoriteProduct, FavoriteActions } from "@/types";

export function favoriteReducer(
  state: FavoriteProduct[],
  action: FavoriteActions,
): FavoriteProduct[] {
  switch (action.type) {
    case "TOGGLE_FAVOURITE":
      const exists = state.some((item) => item.id === action.payload.id);

      if (exists) {
        return state.filter((item) => item.id !== action.payload.id);
      }

      return [...state, action.payload];

    case "CLEAR_FAVOURITES":
      return [];

    default:
      return state;
  }
}

export type FavoriteContextType = {
  favorite: FavoriteProduct[];
  dispatch: Dispatch<FavoriteActions>;
  mounted: boolean;
};

export const FavoriteContext = createContext<FavoriteContextType | null>(null);
