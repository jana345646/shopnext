"use client";

import { useEffect, useMemo, useState } from "react";
import { Product } from "@/types";
import { ProductsContext } from "./ProductsContext";
import { fetchProducts } from "@/lib/api";

export default function ProductsProvider({
  //layout.tsx automatically send the children here (children is the current page that is opened in the site) , and any children here can use this provider to reach the data from the context
  children, //ProductsProvider({children: <Page />}) react send it as an object so we detruct it here
}: {
  children: React.ReactNode;
}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [sortType, setSortType] = useState<"asc" | "desc">("asc");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [offline, setOffline] = useState(false);
  const [error, SetError] = useState<string | null>(null);

  useEffect(() => {
    // ueseEffect dont take an async function directly so we used ()=>{}
    async function Products() {
      try {
        SetError(null);

        const data = await fetchProducts();

        setProducts(data);
      } catch (error) {
        SetError("Something went wrong");
      }
    }

    Products();
  }, []);

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
