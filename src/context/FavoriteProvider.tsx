"use client";
import { useReducer, useEffect, useState, useContext } from "react";
import { FavoriteContext, favoriteReducer } from "./FavoriteContext";
import { AuthContext } from "@/context/AuthContext";

const getInitialFavorites = () => {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem("shopnext_favourites");
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Failed to parse favourites from localStorage", error);
    return [];
  }
};

export function FavoriteProvider({ children }: { children: React.ReactNode }) {
  const [favorite, dispatch] = useReducer(
    favoriteReducer,
    [],
    getInitialFavorites,
  );
  const [mounted, setMounted] = useState(false);
  const auth = useContext(AuthContext);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    if (favorite.length === 0) {
      localStorage.removeItem("shopnext_favourites");
    } else {
      localStorage.setItem("shopnext_favourites", JSON.stringify(favorite));
    }
  }, [favorite, mounted]);

  useEffect(() => {
    if (!mounted) return;

    if (!auth?.loadingAuth && !auth?.user) {
      dispatch({ type: "CLEAR_FAVOURITES" });
      localStorage.removeItem("shopnext_favourites");
    }
  }, [auth?.user, mounted]);

  return (
    <FavoriteContext.Provider value={{ favorite, dispatch, mounted }}>
      {children}
    </FavoriteContext.Provider>
  );
}

export default FavoriteProvider;
