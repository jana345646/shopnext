"use client";
import { useState, useEffect } from "react";
import { FavoriteContext } from "./FavoriteContext";
import { Product } from "@/types";

function FavoriteProvider({ children }: { children: React.ReactNode }) {
  const [favorite, SetFavorite] = useState<Product[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) {
      SetFavorite(JSON.parse(stored));
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) {
      localStorage.setItem("favorites", JSON.stringify(favorite));
    }
  }, [favorite, hydrated]);

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
