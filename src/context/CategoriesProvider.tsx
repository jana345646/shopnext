"use client";

import React, { useState, useEffect } from "react";
import { CategoryContext } from "./CategoriesContext";
import { Category } from "@/types";

function CategoriesProvider({ children }: { children: React.ReactNode }) {
  const [category, SetCategory] = useState<Category>([]);
  const [error, SetError] = useState<string | null>(null);

  useEffect(() => {
    async function getCategories() {
      try {
        const res = await fetch("https://fakestoreapi.com/products/categories");

        if (!res.ok) {
          throw new Error("Failed to fetch categories");
        }

        const data = await res.json();
        SetCategory(data);
      } catch (err) {
        console.error("Categories fetch error:", err);
        SetError("failed");
      }
    }

    getCategories();
  }, []);

  return (
    <CategoryContext.Provider value={{ category, SetCategory, error }}>
      {children}
    </CategoryContext.Provider>
  );
}
export default CategoriesProvider;
