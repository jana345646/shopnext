"use client";

import { useContext } from "react";
import { ProductsContext } from "@/context/ProductsContext";
import ProductCard from "@/components/ProductCard";
import Sorting from "@/components/Sorting";
import OfflineBanner from "@/components/OfflineBanner";
import EmptyState from "@/components/EmptyState";
import ProductSkeleton from "@/components/ProductSkeleton";
import Error from "next/error";
import Link from "next/link";
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
        {/* الحالة الأولى: لو البيانات لسه بتحمل أو مش موجودة خالص، بنعرض الـ Skeleton */}
        {!products || products.length === 0 ? (
          [...Array(8)].map((_, key) => <ProductSkeleton key={key} />)
        ) : filteredProducts && filteredProducts.length > 0 ? (
          // الحالة الثانية: لو فيه منتجات بعد الفلترة، بنعمل لها map
          filteredProducts.map((product) => (
            <Link key={product.id} href={`/products/${product.id}`}>
              <ProductCard product={product} />
            </Link>
          ))
        ) : (
          // الحالة الثالثة: لو الـ array فاضية ومفيش منتجات مطابقة
          <EmptyState />
        )}
      </div>
    </div>
  );
}
