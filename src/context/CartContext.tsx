import { createContext } from "react";
import { CartProduct, CartActions } from "@/types";
import { Dispatch } from "react"; // this is a type in react for the function(dispatch) that send the actions to the reducer

export function cartReducer(state: CartProduct[], action: CartActions) {
  // this is a function(reducer) that is responsible for hnadling the changes in the cart , state(current state of the cart) , action(the data that is sent in the dispatch)
  //react sends the sate to the reducer automatically when we make a dispatch
  switch (action.type) {
    case "ADD_ITEM":
      const existing = state.find((item) => item.id === action.payload.id);

      if (existing) {
        return state.map((item) =>
          item.id === action.payload.id
            ? {
                ...item,
                quantity: item.quantity + action.payload.quantity,
              }
            : item,
        );
      }

      return [...state, action.payload];

    case "REMOVE_ITEM":
      return state.filter((item) => item.id !== action.payload.id); //if true keep the item , filter keeps the ture only

    case "UPDATE_QTY":
      return state.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity } //...item this means take all the items data as it is and change only the quantity
          : item,
      );

    case "CLEAR_CART":
      return [];

    default:
      return state;
  }
}

export type CartContextType = {
  cart: CartProduct[];
  dispatch: Dispatch<CartActions>;
  mounted: boolean;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  storageAvailable: boolean;
};

export const CartContext = createContext<CartContextType | null>(null); //initial value null
