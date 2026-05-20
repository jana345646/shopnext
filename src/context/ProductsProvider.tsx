"use client";

import { useEffect, useState } from "react";
import { Product } from "@/types";
import { ProductsContext } from "./ProductsContext";

export default function ProductsProvider({
  children,
  initialProducts = [],
}: {
  children: React.ReactNode;
  initialProducts: Product[];
}) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [filteredProducts, setFilteredProducts] =
    useState<Product[]>(initialProducts);
  const [sortType, SetSortType] = useState<"asc" | "desc">("asc");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [offline, setOffline] = useState(false);
  const [error, SetError] = useState<string | null>(null);

  const fetchProductsClientSide = async () => {
    try {
      SetError(null);

      const res = await fetch("https://fakestoreapi.com/products");

      if (!res.ok) throw new Error("Failed to fetch products");

      const data: Product[] = await res.json();

      setProducts(data);
      setFilteredProducts(data);
    } catch (error: any) {
      SetError(error.message || "Something went wrong");
    }
  };
  const retryFetch = () => {
    fetchProductsClientSide();
  };

  useEffect(() => {
    if (initialProducts.length > 0) {
      setProducts(initialProducts);
      setFilteredProducts(initialProducts);
    } else if (products.length === 0) {
      fetchProductsClientSide();
    }
  }, [initialProducts]);

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

  useEffect(() => {
    if (!products || products.length === 0) return;

    let result = [...products];

    if (selectedCategory && selectedCategory !== "") {
      result = result.filter(
        (product) => product.category === selectedCategory,
      );
    }

    if (sortType === "asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortType === "desc") {
      result.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(result);
  }, [products, selectedCategory, sortType]);

  return (
    <ProductsContext.Provider
      value={{
        products,
        setProducts,
        filteredProducts,
        setFilteredProducts,
        sortType,
        SetSortType,
        offline,
        setOffline,
        selectedCategory,
        setSelectedCategory,
        error,
        SetError,
        retryFetch,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}
