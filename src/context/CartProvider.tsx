"use client";

import { useReducer, useEffect, useState, useContext } from "react";
import { CartContext, cartReducer } from "./CartContext";
import { AuthContext } from "@/context/AuthContext";

const getInitialCart = () => {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem("shopnext_cart");
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, dispatch] = useReducer(cartReducer, undefined, getInitialCart);
  const [mounted, setMounted] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const auth = useContext(AuthContext);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    if (cart.length === 0) {
      localStorage.removeItem("shopnext_cart");
    } else {
      localStorage.setItem("shopnext_cart", JSON.stringify(cart));
    }
  }, [cart, mounted]);

  useEffect(() => {
    if (!mounted) return;
    if (auth?.loadingAuth) return;

    if (!auth?.user) {
      dispatch({ type: "CLEAR_CART" });
      localStorage.removeItem("shopnext_cart");
    }
  }, [auth?.user, auth?.loadingAuth, mounted]);

  return (
    <CartContext.Provider
      value={{
        cart,
        dispatch,
        mounted,
        isCartOpen,
        setIsCartOpen,
        storageAvailable: typeof window !== "undefined",
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
