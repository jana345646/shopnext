"use client";

import { useCallback, useEffect, useState } from "react"; // usecallback is a hook that make the function to be recreated in the memory only if it's dependency array changed , not to be created each time the component is rendered  , we use it if the function is in an dependency array or ia s prop ina child component onlyy
import { Product } from "@/types";
import { fetchProducts } from "@/lib/api";

export function useProducts() {
  // this is a custom hook == reusable fuction
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const start = Date.now(); // date.now here  is the current time before the data is retrieved

      const data = await fetchProducts();

      const elapsed = Date.now() - start; //date.noe here si the time after the data is retrieved
      const remaining = 300 - elapsed; // as we need to wait 300ms

      setTimeout(
        () => {
          setProducts(data);
          setLoading(false);
        },
        remaining > 0 ? remaining : 0, // if there is a remaining time wit it if no siplay
      );
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  return {
    products,
    loading,
    error,
    retry: getProducts,
  };
}
