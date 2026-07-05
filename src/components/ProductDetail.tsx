"use client";

import { useContext } from "react";
import { ProductContext } from "@/context/ProductContext";
import { CartContext } from "@/context/CartContext";
import Image from "next/image";
import { FiMinus, FiPlus, FiEye } from "react-icons/fi";
import RatingStars from "./RatingStars";
import FavoriteButton from "./FavoriteButton";
import RelatedProducts from "./RelatedProducts";
import BreadCrumb from "./BreadCrumb";
import { FavoriteContext } from "@/context/FavoriteContext";

function ProductDetail() {
  const productData = useContext(ProductContext);
  const cartData = useContext(CartContext);
  const favoriteData = useContext(FavoriteContext);

  if (!productData || !cartData || !favoriteData) return null;

  const { product, stepper, setStepper } = productData;
  const { dispatch: cartDispatch } = cartData;

  if (!product) return null;

  function addToCart() {
    if (!product) return;

    cartDispatch({
      type: "ADD_ITEM",
      payload: {
        id: product.id,
        title: product.title,
        image: product.image,
        price: product.price,
        quantity: stepper,
      },
    });
  }

  return (
    <div className="w-full flex flex-col">
      <BreadCrumb product={product} />
      <div className="flex items-center justify-center px-[5rem] gap-[7rem]">
        <div className="relative w-[20%] h-[30rem] flex">
          <Image
            src={product.image}
            alt={product.title}
            fill
            unoptimized
            className="object-contain"
          />
        </div>

        <div className="flex flex-col gap-4 w-[50%]">
          <div className="flex items-center justify-between">
            <span className="font-bold text-[2.5rem]">{product.title}</span>
            <FavoriteButton product={product} />
          </div>

          <div className="flex items-center justify-between">
            <RatingStars rate={product.rating.rate} />
            <span className="text-gray-800 font-bold">{product.category}</span>
          </div>

          <div className="flex items-center gap-1">
            <FiEye />
            <span>{product.rating.count}</span>
          </div>

          <span className="font-bold text-[1.5rem]">${product.price}</span>
          <span className="text-sm text-[#00000099]">
            {product.description}
          </span>

          <div className="flex justify-between">
            <div className="flex w-[10rem] bg-[#F0F0F0] rounded-[3rem] p-3 justify-around">
              <button
                onClick={() => setStepper((p) => p - 1)}
                disabled={stepper === 1}
              >
                <FiMinus />
              </button>
              <span>{stepper}</span>
              <button
                onClick={() => setStepper((p) => p + 1)}
                disabled={stepper === 99}
              >
                <FiPlus />
              </button>
            </div>

            <button
              className="bg-black text-white px-6 py-3 rounded-[3rem] w-[50%]"
              onClick={addToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      <div className="w-full flex justify-center">
        <div className="w-full px-[5rem]">
          <RelatedProducts />
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
