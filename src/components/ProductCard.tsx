"use client";

import { Product } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { IoCartOutline } from "react-icons/io5";
import RatingStars from "./RatingStars";
import FavoriteButton from "./FavoriteButton";

export default function ProductCard({ product }: { product: Product }) {
  if (!product) return null;

  return (
    <Link href={`/products/${product.id}`} className="w-full">
      <div className="w-full mx-auto flex flex-col items-center px-2 pb-4 bg-white rounded-md pt-4 hover:shadow-md transition">
        <div className="relative w-[50%] aspect-square">
          <Image
            src={product.image || "/fallback-placeholder.png"}
            alt={product.title || "Product"}
            fill
            className="object-contain"
            unoptimized
          />
        </div>

        <div className="w-full h-12 flex items-center justify-center px-1">
          <span className="text-center font-medium line-clamp-2">
            {product.title}
          </span>
        </div>

        <RatingStars rate={product?.rating?.rate ?? 0} />

        <div className="w-full flex justify-between items-center px-1 mt-2">
          <span>${product.price}</span>

          <div className="flex gap-1 items-center">
            <FavoriteButton product={product} />
            <IoCartOutline className="text-xl cursor-pointer" />
          </div>
        </div>
      </div>
    </Link>
  );
}
