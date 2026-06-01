"use client";

import { useContext, useEffect } from "react";
import { ProductsContext } from "@/context/ProductsContext";
import ProductCard from "@/components/ProductCard";
import Sorting from "@/components/Sorting";
import OfflineBanner from "@/components/OfflineBanner";
import EmptyState from "@/components/EmptyState";
import ProductSkeleton from "@/components/ProductSkeleton";
import Error from "next/error";

interface ProductsClientProps {
  categoryData: string;
}

export default function ProductsClient({ categoryData }: ProductsClientProps) {
  const productscontext = useContext(ProductsContext);

  useEffect(() => {
    if (productscontext) {
      productscontext.setSelectedCategory(categoryData);
    }
  }, [categoryData, productscontext]);

  if (!productscontext) return null;

  const { filteredProducts, offline, products, error } = productscontext;

  if (error) {
    return <Error statusCode={500} />;
  }

  return (
    <div className="pt-3 pb-6 bg-[#E9E9E9] px-[4.5rem]">
      <OfflineBanner show={offline} />
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
