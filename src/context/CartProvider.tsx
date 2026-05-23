"use client";

import CartContext from "./CartContext";
import { Product, CartItem } from "@/types";
import { useState, useEffect } from "react";

function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, SetCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("cart");

    if (stored) {
      SetCart(JSON.parse(stored));
    }
  }, []);

  function addToCart(product: Product, quantity: number) {
    SetCart((prev) => {
      return [...prev, { quantity, product }];
    });
  }

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, SetCart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
