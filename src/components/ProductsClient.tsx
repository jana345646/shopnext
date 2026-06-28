"use client"; // it runs the component on the client side (browser , we use it with the user interactions with the website) not on the server side

import { useContext } from "react"; // this is a hook to can read from the context
import { ProductsContext } from "@/context/ProductsContext";
import ProductCard from "@/components/ProductCard";
import Sorting from "@/components/Sorting";
import OfflineBanner from "@/components/OfflineBanner";
import EmptyState from "@/components/EmptyState";
import ProductSkeleton from "@/components/ProductSkeleton";
import ProductsError from "./ProductsError";
import Link from "next/link"; //this is a component in next that navigate between the pages without reloading

export default function ProductsClient() {
  const productsData = useContext(ProductsContext);

  if (!productsData) return null; //this means if there is no data returned from the context (no provider) , don't run the component

  const { filteredProducts, offline, products, error, loading } = productsData;

  if (error) {
    return <ProductsError />;
  }

  return (
    <div className="py-6 px-[4.5rem] bg-[#E9E9E9]">
      <OfflineBanner show={offline} />

      <Sorting />

      <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-5 ">
        {loading ? (
          Array.from({ length: 8 }).map((_, key) => (
            <ProductSkeleton key={key} />
          ))
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
