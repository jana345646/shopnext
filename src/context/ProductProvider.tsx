"use client";
import { ProductContext } from "./ProductContext";
import { useState, useEffect } from "react";
import { Product } from "@/types";
import { notFound } from "next/navigation";

interface ProviderProps {
  children: React.ReactNode;
  serverProduct: Product | null;
  id: string;
}

function ProductProvider({ children, serverProduct, id }: ProviderProps) {
  const [product, SetProduct] = useState<Product | null>(serverProduct);
  const [stepper, SetStepper] = useState<number>(1);

  useEffect(() => {
    async function getProduct() {
      try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);

        // لو المنتج مش موجود في الـ API
        if (!res.ok) {
          notFound();
          return;
        }

        const text = await res.text();
        if (!text) {
          notFound();
          return;
        }

        const data: Product = JSON.parse(text);
        SetProduct(data);
      } catch (err) {
        console.error("Client fetch failed:", err);
        notFound();
      }
    }

    if (!serverProduct) {
      getProduct();
    }
  }, [id, serverProduct]);

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
