"use client";

import { ProductsContext } from "@/context/ProductsContext";
import { useContext } from "react";

export default function ProductsError() {
  const productsData = useContext(ProductsContext);

  if (!productsData) return null;

  const { retry } = productsData;

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center font-bold my-8 gap-4 ">
      <p>Something went wrong</p>

      <button
        className="text-white bg-[#1E1E1E] p-3 w-[20%] rounded-[0.3rem]"
        onClick={retry}
      >
        Retry
      </button>
    </div>
  );
}
