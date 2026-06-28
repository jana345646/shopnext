"use client";

import { useCallback, useEffect, useState } from "react";
import { fetchCategories } from "@/lib/api";
import { Category } from "@/types";

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoriesError, setCategoriesError] = useState<string | null>(null);

  const getCategories = useCallback(async () => {
    try {
      setCategoriesError(null);

      const data = await fetchCategories();

      setCategories(data);
    } catch (err) {
      console.error(err);
      setCategoriesError("Failed to load categories");
    }
  }, []);

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  return {
    categories,
    categoriesError,
    retryCategories: getCategories,
  };
}
