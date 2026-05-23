"use client";

import { useContext } from "react";
import { ProductContext } from "@/context/ProductContext";
import Image from "next/image";
import { FiMinus, FiPlus, FiEye } from "react-icons/fi";
import RatingStars from "./RatingStars";
import FavoriteButton from "./FavoriteButton";
import CartContext from "@/context/CartContext";

function ProductDetail() {
  const productData = useContext(ProductContext);
  const cartData = useContext(CartContext);

  if (!productData || !cartData) return null;

  const { product, stepper, SetStepper } = productData;
  const { addToCart } = cartData;

  if (!product) return null;

  return (
    <div className="w-full h-[40rem] flex items-center justify-center px-[5rem] gap-[7rem]">
      {/* Image */}
      <div className="relative w-[20%] h-full flex items-center justify-center">
        <Image
          src={product.image}
          alt={product.title}
          fill
          unoptimized
          className="object-contain"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-4 w-[50%]">
        {/* Title + Favorite */}
        <div className="flex items-center justify-between">
          <span className="font-bold text-[2.5rem]">{product.title}</span>

          <FavoriteButton product={product} />
        </div>

        <RatingStars rate={product?.rating?.rate ?? 0} />

        <div className="flex items-center gap-1">
          <FiEye />
          <span>{product?.rating?.count}</span>
        </div>

        <span className="font-bold text-[1.5rem]">${product.price}</span>

        <span className="text-sm text-[#00000099] leading-[1.5rem]">
          {product.description}
        </span>

        <span className="text-gray-600">{product.category}</span>

        {/* Stepper */}
        <div className="flex justify-between">
          <div className="flex w-[10rem] bg-[#F0F0F0] rounded-[3rem] p-3 justify-around">
            <button
              onClick={() => SetStepper((p) => p - 1)}
              disabled={stepper === 1}
            >
              <FiMinus />
            </button>

            <span>{stepper}</span>

            <button onClick={() => SetStepper((p) => p + 1)}>
              <FiPlus />
            </button>
          </div>

          <button
            className="bg-black text-white px-6 py-3 rounded-[3rem] w-[50%]"
            onClick={() => addToCart(product, stepper)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
