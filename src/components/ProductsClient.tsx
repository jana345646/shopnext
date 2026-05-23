"use client";

import { useContext } from "react";
import { ProductsContext } from "@/context/ProductsContext";
import ProductCard from "@/components/ProductCard";
import Sorting from "@/components/Sorting";
import OfflineBanner from "@/components/OfflineBanner";
import EmptyState from "@/components/EmptyState";
import ProductSkeleton from "@/components/ProductSkeleton";
import Error from "next/error";
export default function ProductsClient() {
  const context = useContext(ProductsContext);

  if (!context) return null;

  const { filteredProducts, offline, products, error } = context;

  if (error) {
    return <Error />;
  }

  return (
    <div className="pt-3 pb-6 bg-[#E9E9E9] px-[4.5rem]">
      <OfflineBanner show={offline} />
      <Sorting />

      <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-5 items-start justify-center">
        {!products || products.length === 0 ? (
          [...Array(8)].map((_, key) => <ProductSkeleton key={key} />)
        ) : filteredProducts?.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
}
