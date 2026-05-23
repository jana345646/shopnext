"use client";

import { useState, useEffect } from "react";
import { CategoryContext } from "./CategoriesContext";
import { Category } from "@/types";

export default function CategoriesProvider({
  children,
  initialCategories = [],
}: {
  children: React.ReactNode;
  initialCategories: Category[];
}) {
  const [category, SetCategory] = useState<Category[]>(initialCategories);
  const [error, SetError] = useState<string | null>(null);

  const getCategories = async () => {
    try {
      const res = await fetch("https://fakestoreapi.com/products/categories");

      if (!res.ok) throw new Error();

      const data = await res.json();
      SetCategory(data);
    } catch (err) {
      console.error(err);
      SetError("failed");
    }
  };

  useEffect(() => {
    if (initialCategories.length === 0) {
      getCategories();
    }
  }, [initialCategories]);

  return (
    <CategoryContext.Provider value={{ category, SetCategory, error }}>
      {children}
    </CategoryContext.Provider>
  );
}
