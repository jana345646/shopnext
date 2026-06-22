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

  // 1. حفظ الداتا (بيحفظ علطول طول ما الـ component عملت mount)
  useEffect(() => {
    if (!mounted) return;

    if (cart.length === 0) {
      localStorage.removeItem("shopnext_cart");
    } else {
      localStorage.setItem("shopnext_cart", JSON.stringify(cart));
    }
  }, [cart, mounted]);

  // 2. عند الـ Logout الصريح (مش هيشتغل وقت الـ Refresh لأن الـ flag هيكون لسه موجود)
  useEffect(() => {
    if (!mounted) return;

    const isLoggedIn = localStorage.getItem("shopnext_logged_in") === "true";

    if (!auth?.user && !isLoggedIn) {
      dispatch({ type: "CLEAR_CART" });
      localStorage.removeItem("shopnext_cart");
    }
  }, [auth?.user, mounted]);

  return (
    <CartContext.Provider
      value={{
        cart,
        dispatch,
        mounted,
        setMounted,
        isCartOpen,
        setIsCartOpen,
        storageAvailable: true,
        setStorageAvailable: () => {},
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
