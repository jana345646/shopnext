//we create a context for the the cart as if we put it in the product context and edit in the cart value all the components that uses this context wwill render automatically (low performance)

import { createContext } from "react";
import { Product } from "@/types";
import { CartItem } from "@/types";

export type CartContextType = {
  cart: CartItem[];
  SetCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  addToCart: (product: Product, quantity: number) => void; // this is a normal function not a state and it dosent return a value it only make a specfic task so it retrns void
};

export const CartContext = createContext<CartContextType>({
  cart: [],
  SetCart: () => {},
  addToCart: () => {},
});
export default CartContext;
