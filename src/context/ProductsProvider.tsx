"use client";

import { useMemo, useState } from "react";
import { ProductsContext } from "./ProductsContext";

import { useProducts } from "@/hooks/useProducts";
import { useCategories } from "@/hooks/useCategories";
import { useOnlineStatus } from "@/hooks/useNetworkStatus";

export default function ProductsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { products, loading, error, retry } = useProducts();
  const { categories, categoriesError } = useCategories();
  const { offline } = useOnlineStatus();

  const [sortType, setSortType] = useState<"asc" | "desc">("asc");
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (selectedCategory) {
      result = result.filter(
        (product) => product.category === selectedCategory,
      );
    }

    if (sortType === "asc") {
      result.sort((a, b) => a.price - b.price);
    } else {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [products, selectedCategory, sortType]);

  return (
    <ProductsContext.Provider
      value={{
        products,
        loading,
        error,
        retry,

        categories,
        categoriesError,

        offline,

        sortType,
        setSortType,

        selectedCategory,
        setSelectedCategory,

        filteredProducts,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}
