// provider is the main file that wraps our project to enable any component to get the data directly from the context
// in the provider we fetch the data then store it in the context
"use client";

import { useEffect, useState } from "react";
import { Product } from "@/types";
import { ProductsContext } from "./ProductsContext";

export default function ProductsProvider({
  //the provider taks the children as any component that needs to get the data from the context must be wrapprd with the provider
  children,
}: {
  children: React.ReactNode;
}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [sortType, SetSortType] = useState<"asc" | "desc">("asc");
  const [selectedCategory, setSelectedCategory] = useState<string>(""); //string without an array as the user will choose only one option
  const [loading, SetLoading] = useState<boolean>(true);
  const [error, SetError] = useState<boolean>(false);
  const [offline, SetOffline] = useState(false);

  const fetchProducts = async () => {
    try {
      SetLoading(true);

      SetError(false);

      const res = await fetch("https://fakestoreapi.com/products");

      if (!res.ok) {
        throw new Error();
      }

      const data: Product[] = await res.json();

      await new Promise((res) => setTimeout(res, 300));

      setProducts(data);

      setFilteredProducts(data);

      localStorage.setItem("products", JSON.stringify(data));
    } catch (err) {
      SetError(true);
      SetLoading(false);

      const cached = localStorage.getItem("products");

      if (cached) {
        const parsed = JSON.parse(cached);

        setProducts(parsed);
        setFilteredProducts(parsed);
      }
    } finally {
      SetLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const handleOffline = () => SetOffline(true);
    const handleOnline = () => SetOffline(false);

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, []);

  useEffect(() => {
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

    setFilteredProducts(result);
  }, [products, selectedCategory, sortType]);

  return (
    <ProductsContext.Provider
      value={{
        products,
        filteredProducts,
        setFilteredProducts,
        sortType,
        SetSortType,
        selectedCategory,
        setSelectedCategory,
        loading,
        error,
        fetchProducts,
        offline,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}
//get from the products context the provider , then the provider share the value with the children
//store the data in the context , then any child inside it can reach this values.
//we are creating the provider
