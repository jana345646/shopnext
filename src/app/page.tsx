"use client"; // as usecontext work only on the client side

import { useContext } from "react";
import { ProductsContext } from "@/context/ProductsContext";
import ProductCard from "@/components/ProductCard";
import Sorting from "@/components/Sorting";
import ProductSkeleton from "@/components/ProductSkeleton";
import ProductsError from "@/components/ProductsError";
import OfflineBanner from "@/components/OfflineBanner";
import EmptyState from "@/components/EmptyState";

export default function Products() {
  const context = useContext(ProductsContext);

  if (!context) return null;

  const { products, filteredProducts, loading, error, fetchProducts, offline } =
    context;

  if (error) {
    return <ProductsError onRetry={fetchProducts} />;
  }

  return (
    <div className="pt-3 pb-6 bg-[#E9E9E9] px-[4.5rem]">
      <OfflineBanner show={offline} />

      <Sorting />

      <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-5 items-start justify-center">
        {loading ? (
          [...Array(8)].map((_, key) => <ProductSkeleton key={key} />)
        ) : filteredProducts.length > 0 ? (
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
