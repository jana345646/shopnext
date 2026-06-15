// "use client";
// import { useState, useEffect } from "react";
// import { FavoriteContext } from "./FavoriteContext";
// import { Product } from "@/types";

// function FavoriteProvider({ children }: { children: React.ReactNode }) {
//   const [favorite, SetFavorite] = useState<Product[]>(() => {
//     if (typeof window !== "undefined") {
//       const stored = localStorage.getItem("favorites");
//       return stored ? JSON.parse(stored) : [];
//     }
//     return [];
//   });

//   function toggleFavorite(product: Product) {
//     SetFavorite((prev) => {
//       const exists = prev.some((item) => item.id === product.id); // some loops on the array to know if there is at least one item matches the condition

//       if (exists) {
//         return prev.filter((item) => item.id !== product.id); // if they are not the same it will be saved in the prev array
//       }

//       return [...prev, product];
//     });
//   }

//   useEffect(() => {
//     localStorage.setItem("favorites", JSON.stringify(favorite));
//   }, [favorite]);

//   return (
//     <FavoriteContext.Provider
//       value={{
//         favorite,
//         SetFavorite,
//         toggleFavorite,
//       }}
//     >
//       {children}
//     </FavoriteContext.Provider>
//   );
// }
// export default FavoriteProvider;

"use client";
import { FavoriteContext } from "./FavoriteContext";
import { favoriteReducer } from "./FavouritesContext";
import { useReducer, useEffect } from "react";

const getInitialFavorites = () => {
  if (typeof window === "undefined") return [];

  const stored = localStorage.getItem("shopnext_favourites");

  return stored ? JSON.parse(stored) : [];
};

export function FavoriteProvider({ children }: { children: React.ReactNode }) {
  const [favorite, dispatch] = useReducer(
    favoriteReducer,
    [],
    getInitialFavorites,
  );

  useEffect(() => {
    localStorage.setItem("shopnext_favourites", JSON.stringify(favorite));
  }, [favorite]);

  return (
    <FavoriteContext.Provider
      value={{
        favorite,
        dispatch,
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
}
