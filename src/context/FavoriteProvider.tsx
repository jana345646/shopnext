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
        SetFavorite,
        toggleFavorite: (product: Product) => {
          SetFavorite((prev) => {
            const exists = prev.some((item) => item.id === product.id);

            if (exists) {
              return prev.filter((item) => item.id !== product.id);
            }

            return [...prev, product];
          });
        },
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
}

export default FavoriteProvider;
