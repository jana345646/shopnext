"use client";
import { ProductContext } from "./ProductContext";
import { useState, useEffect } from "react";
import { Product } from "@/types";
import { fetchProduct } from "@/lib/api";

interface ProviderProps {
  children: React.ReactNode; // as in the page.tsx an object will be sent from it with this 2 parameters
  id: string;
}

function ProductProvider({ children, id }: ProviderProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [stepper, setStepper] = useState<number>(1);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function getProduct() {
      try {
        const data = await fetchProduct(id);

        if (!data) {
          setNotFound(true);
          return;
        }

        setProduct(data);
      } catch (err) {
        console.error("Client fetch failed:", err);
        setNotFound(true);
      }
    }

    getProduct();
  }, [id]);

  if (notFound) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-6">
        <h1 className="text-3xl font-bold">404 - Product Not Found</h1>
        <p className="text-gray-500">This product does not exist.</p>
        <Link
          href="/"
          className="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <ProductContext.Provider
      value={{
        product,
        setProduct,
        stepper,
        setStepper,
        notFound,
        setNotFound,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export default ProductProvider;
