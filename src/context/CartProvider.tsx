"use client";
import CartContext from "./CartContext";
import { Product } from "@/types";
import { useState } from "react";
import { CartItem } from "@/types";

function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, SetCart] = useState<CartItem[]>([]);

  function addToCart(product, quantity) {
    SetCart((prev) => {
      //prev to refer to the previous products in the cart
      return [...prev, { quantity, product }];
    });
  }

  return (
    <CartContext.Provider value={{ cart, SetCart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}
export default CartProvider;
