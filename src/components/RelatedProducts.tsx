"use client";

import { ProductsContext } from "@/context/ProductsContext";
import { ProductContext } from "@/context/ProductContext";
import { useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { IoCartOutline } from "react-icons/io5";
import RatingStars from "./RatingStars";
import FavoriteButton from "./FavoriteButton";

function RelatedProducts() {
  const productsData = useContext(ProductsContext);
  const ProductData = useContext(ProductContext);

  if (!productsData || !ProductData) return null;

  const { products } = productsData;
  const { product } = ProductData;

  function sameCategory(productCategory: string, ProductId: string | number) {
    return products
      .filter((product) => {
        return product.category === productCategory && product.id !== ProductId;
      })
      .slice(0, 4); // it takes the starting and the ending index without including the ending index
  }

  return (
    <div className="w-full flex flex-col my-12">
      <h1 className="font-[Integral CF] font-bold text-4xl text-center mb-8">
        You might also like
      </h1>

      <div className="w-full flex justify-center gap-8">
        {sameCategory(product.category, product.id).map((product) => (
          <div key={product.id} className="w-[18rem]">
            <Link href={`/products/${product.id}`}>
              <div className="w-full mx-auto flex flex-col items-center px-2 py-4 bg-white rounded-md hover:shadow-lg">
                <div className="relative w-[50%] aspect-square">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </div>

                <div className="px-1">
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
          </div>
        ))}
      </div>
    </div>
  );
}
export default RelatedProducts;
