"use client";
import { FavoriteContext } from "./FavoriteContext";
import { favoriteReducer } from "./FavouritesContext";
import { useReducer, useEffect, useState } from "react";

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

  useEffect(() => {
    localStorage.setItem("shopnext_favourites", JSON.stringify(favorite));
  }, [favorite]);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <FavoriteContext.Provider
      value={{
        favorite,
        dispatch,
        mounted,
        setMounted,
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
}
