"use client";

import { useEffect, useMemo, useState } from "react";
import { Product } from "@/types";
import { ProductsContext } from "./ProductsContext";
import { fetchProducts } from "@/lib/api";

export default function ProductsProvider({
  children,
  initialProducts = [],
}: {
  children: React.ReactNode;
  initialProducts?: Product[];
}) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [sortType, setSortType] = useState<"asc" | "desc">("asc");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [offline, setOffline] = useState(false);
  const [error, SetError] = useState<string | null>(null);

  useEffect(() => {
    if (initialProducts.length > 0) return;

    async function loadProducts() {
      try {
        SetError(null);
        const data = await fetchProducts();
        setProducts(data);
      } catch {
        SetError("Something went wrong");
      }
    }

    loadProducts();
  }, [initialProducts.length]);

  const retryFetch = async () => {
    try {
      SetError(null);

      const data = await fetchProducts();

      setProducts(data);
    } catch (error) {
      SetError("Something went wrong");
    }
  };

  useEffect(() => {
    const handleOffline = () => setOffline(true);
    const handleOnline = () => setOffline(false);

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, []);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (selectedCategory) {
      result = result.filter(
        (product) => product.category === selectedCategory,
      );
    }

    if (sortType === "asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortType === "desc") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [products, selectedCategory, sortType]);

  return (
    <ProductsContext.Provider
      value={{
        // first {to can write js in the jsx} , second {to create an object}
        products,
        setProducts,
        filteredProducts,
        sortType,
        setSortType,
        selectedCategory,
        setSelectedCategory,
        offline,
        setOffline,
        error,
        SetError,
        retryFetch,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}
