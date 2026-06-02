"use client";

import { Product } from "@/types";
import Image from "next/image"; // this is a component in next that make the image to be lazy loading(will be displayed when we reach it in the page) ,responsive , image optimization
import Link from "next/link";
import { IoCartOutline } from "react-icons/io5";
import RatingStars from "./RatingStars";
import FavoriteButton from "./FavoriteButton";
import FallBackImage from "./FallBackImage";

export default function ProductCard({ product }: { product: Product }) {
  if (!product) return null; // if the product wasn not exist react will not run the component and will return null to avoid crashing the project
  return (
    <Link href={`/products/${product.id}`} className="w-full">
      <div className="w-full mx-auto flex flex-col items-center px-2 py-4 bg-white rounded-md hover:shadow-lg">
        <div className="relative w-[50%] aspect-square">
          <FallBackImage
            src={product.image}
            alt={product.title}
            className="object-contain" // it dispaly the whole image without any cuts , aspect-square it makes ,  the div a square shape (w = h) unoptimized
            unoptimized
          />
        </div>
        <div className="w-full h-12 flex items-center justify-center px-1">
          <span className="text-center font-medium line-clamp-2">
            {product.title}
          </span>
        </div>
        <RatingStars rate={product.rating.rate} />
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
//line-clamp: to make the text take only 2 lines then .....
