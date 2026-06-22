"use client";

import { useContext, useEffect } from "react";
import { ProductsContext } from "@/context/ProductsContext";
import ProductCard from "@/components/ProductCard";
import Sorting from "@/components/Sorting";
import OfflineBanner from "@/components/OfflineBanner";
import EmptyState from "@/components/EmptyState";
import ProductSkeleton from "@/components/ProductSkeleton";
import ProductsError from "./ProductsError";
import Link from "next/link"; // استوردنا Link عشان يرجع للـ Home بسرعة

interface ProductsClientProps {
  categoryData: string;
}

export default function ProductsClient({ categoryData }: ProductsClientProps) {
  const productscontext = useContext(ProductsContext);

  if (!productscontext) return null;

  const { filteredProducts, offline, products, error, retryFetch } =
    productscontext;

  if (error) {
    return <ProductsError onRetry={retryFetch} />;
  }

  return (
    <div className="pt-3 pb-6 bg-[#E9E9E9] px-[4.5rem]">
      <OfflineBanner show={offline} />

      {categoryData && (
        <div className="flex items-center gap-2 text-sm ">
          <Link href="/" className="text-lg text-gray-500 flex gap-2 my-4 pl-4">
            Home
          </Link>
          <span>{">"}</span>
          <span className="text-lg text-black flex gap-2 my-4 pl-4">
            {categoryData}
          </span>
        </div>
      )}

      <Sorting />

      <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-5 items-start justify-center">
        {!products || products.length === 0 ? (
          [...Array(8)].map((_, key) => <ProductSkeleton key={key} />)
        ) : filteredProducts?.length > 0 ? (
          filteredProducts
            .filter((product) => product && product.id)
            .map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
}
