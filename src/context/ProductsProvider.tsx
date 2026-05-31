// "use client";

// import { useEffect, useState } from "react";
// import { Product } from "@/types";
// import { ProductsContext } from "./ProductsContext";

// export default function ProductsProvider({
//   children,
//   initialProducts = [],
// }: {
//   children: React.ReactNode;
//   initialProducts: Product[];
// }) {
//   const [products, setProducts] = useState<Product[]>(initialProducts);
//   const [filteredProducts, setFilteredProducts] =
//     useState<Product[]>(initialProducts);
//   const [sortType, setSortType] = useState<"asc" | "desc">("asc");
//   const [selectedCategory, setSelectedCategory] = useState<string>("");
//   const [offline, setOffline] = useState(false);
//   const [error, SetError] = useState<string | null>(null);

//   const fetchProductsClientSide = async () => {
//     try {
//       SetError(null);

//       const res = await fetch("https://fakestoreapi.com/products");

//       if (!res.ok) throw new Error("Failed to fetch products");

//       const data: Product[] = await res.json();
//       console.log("fetched from client");

//       setProducts(data);
//       setFilteredProducts(data);
//     } catch (error) {
//       const err = error as Error;
//       SetError(error.message || "Something went wrong");
//     }
//   };
//   const retryFetch = () => {
//     fetchProductsClientSide();
//   };

//   // eslint-disable-next-line react-hooks/set-state-in-effect
//   useEffect(() => {
//     if (initialProducts.length > 0) {
//       setProducts(initialProducts);
//       setFilteredProducts(initialProducts);
//     } else if (products.length === 0) {
//       fetchProductsClientSide();
//     }
//   }, [initialProducts]);

//   useEffect(() => {
//     const handleOffline = () => setOffline(true);
//     const handleOnline = () => setOffline(false);
//     window.addEventListener("offline", handleOffline);
//     window.addEventListener("online", handleOnline);
//     return () => {
//       window.removeEventListener("offline", handleOffline);
//       window.removeEventListener("online", handleOnline);
//     };
//   }, []);

//   useEffect(() => {
//     if (!products || products.length === 0) return;

//     let result = [...products];

//     if (selectedCategory && selectedCategory !== "") {
//       result = result.filter(
//         (product) => product.category === selectedCategory,
//       );
//     }

//     if (sortType === "asc") {
//       result.sort((a, b) => a.price - b.price);
//     } else if (sortType === "desc") {
//       result.sort((a, b) => b.price - a.price);
//     }

//     setFilteredProducts(result);
//   }, [products, selectedCategory, sortType]);

//   return (
//     <ProductsContext.Provider
//       value={{
//         products,
//         setProducts,
//         filteredProducts,
//         setFilteredProducts,
//         sortType,
//         setSortType,
//         offline,
//         setOffline,
//         selectedCategory,
//         setSelectedCategory,
//         error,
//         SetError,
//         retryFetch,
//       }}
//     >
//       {children}
//     </ProductsContext.Provider>
//   );
// }

"use client";

import { useEffect, useMemo, useState } from "react";
import { Product } from "@/types";
import { ProductsContext } from "./ProductsContext";
import { fetchProducts } from "@/app/lib/api";

export default function ProductsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [sortType, setSortType] = useState<"asc" | "desc">("asc");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [offline, setOffline] = useState(false);
  const [error, SetError] = useState<string | null>(null);

  // ✅ Fetch products from API
  useEffect(() => {
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

  // ✅ Retry fetch
  const retryFetch = async () => {
    try {
      SetError(null);

      const data = await fetchProducts();

      setProducts(data);
    } catch (error) {
      SetError("Something went wrong");
    }
  };

  // ✅ Offline / Online listener
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

  // ✅ Filter + Sort (clean + optimized)
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
