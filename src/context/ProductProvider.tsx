"use client";
import { ProductContext } from "./ProductContext";
import { useState, useEffect } from "react";
import { Product } from "@/types";
import Link from "next/link";

interface ProviderProps {
  children: React.ReactNode;
  serverProduct: Product | null;
  id: string;
}

function ProductProvider({ children, serverProduct, id }: ProviderProps) {
  const [product, SetProduct] = useState<Product | null>(serverProduct);
  const [stepper, SetStepper] = useState<number>(1);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function getProduct() {
      try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!res.ok) {
          setNotFound(true);
          return;
        }
        const text = await res.text();
        if (!text) {
          setNotFound(true);
          return;
        }
        const data: Product = JSON.parse(text);
        SetProduct(data);
      } catch (err) {
        console.error("Client fetch failed:", err);
        setNotFound(true);
      }
    }

    if (!serverProduct) {
      getProduct();
    }
  }, [id, serverProduct]);

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
        SetProduct,
        stepper,
        SetStepper,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export default ProductProvider;
