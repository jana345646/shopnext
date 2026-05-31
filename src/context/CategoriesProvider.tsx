"use client";

import { useState, useEffect } from "react";
import { CategoryContext } from "./CategoriesContext";
import { Category } from "@/types";
import { fetchCategories } from "@/app/lib/api";

export default function CategoriesProvider({
  children,
  initialCategories = [],
}: {
  children: React.ReactNode;
  initialCategories: Category[];
}) {
  const [category, SetCategory] = useState<Category[]>([]);
  const [error, SetError] = useState<string | null>(null);

  useEffect(() => {
    async function Categories() {
      try {
        const data = await fetchCategories();

        SetCategory(data);
      } catch (err) {
        console.error(err);
        SetError("failed");
      }
    }

    if (initialCategories.length === 0) {
      Categories();
    }
  }, [initialCategories]);
  return (
    <CategoryContext.Provider
      value={{ category, SetCategory, error, SetError }}
    >
      {children}
    </CategoryContext.Provider>
  );
}
