import { Dispatch } from "react";
import { FavoriteProduct, FavoriteActions } from "@/types";
import { createContext } from "react";

export function favoriteReducer(
  state: FavoriteProduct[],
  action: FavoriteActions,
) {
  switch (action.type) {
    case "TOGGLE_FAVOURITE": {
      //we check if this product was in the favorite before or not
      const exists = state.some((item) => item.id === action.payload.id); // some as it checks if there is at least on value that it's condition is true , we used some nott map as we need only one value not ana array

      if (exists) {
        return state.filter((item) => item.id !== action.payload.id); //saves true conditions only
      }

      return [...state, action.payload];
    }

    case "CLEAR_FAVOURITES":
      return [];

    default:
      return state;
  }
}

export type favoriteContextType = {
  favorite: FavoriteProduct[];
  dispatch: Dispatch<FavoriteActions>;
};

export const favoriteContext = createContext<favoriteContextType | null>(null);
