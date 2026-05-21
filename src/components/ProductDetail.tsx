"use client";

import { useContext } from "react";
import { ProductContext } from "@/context/ProductContext";
import CartContext from "@/context/CartContext";
import Image from "next/image";
import { RiStarSLine } from "react-icons/ri";
import { FiMinus, FiPlus } from "react-icons/fi";
import { IoCartOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";

function ProductDetail() {
  const productData = useContext(ProductContext);
  const cartData = useContext(CartContext);

  if (!productData || !cartData) return null;

  const { product, stepper, SetStepper } = productData;

  const { cart, addToCart } = cartData;

  const cartCount = cart.reduce((total, item) => {
    // reduce it loops on the array to return only one value
    return total + item.quantity;
  }, 0); // the initial value is zero

  return (
    <div className="w-full h-[40rem] flex justify-between px-[5rem] items-center gap-5">
      <div className="relative w-[20%] h-full">
        {product?.image && (
          <Image
            src={product.image}
            alt={product.title}
            unoptimized
            fill
            className="object-contain"
          />
        )}
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <span className="text-[Integral CF] font-bold text-[2.5rem]">
            {product?.title}
          </span>

          <div className="relative flex items-center">
            <IoCartOutline className="text-4xl" />
            <FaRegHeart className="text-2xl" />
            <span className="absolute -top-4 right-5 rounded-full px-2 text-sm">
              {cartCount}
            </span>
          </div>
        </div>

        <div className="flex">
          <RiStarSLine className="text-3xl" />

          <div className="w-full flex gap-5">
            <span className="text-xl">{product?.rating.rate} / 5</span>

            <span className="text-xl">{product?.rating.count}</span>
          </div>
        </div>

        <span className="text-[Satoshi] font-bold text-[1.5rem]">
          ${product?.price}
        </span>

        <span className="text-[Satoshi] text-center font-normal text-[0.7rem] text-[#00000099] leading-[1.3rem]">
          {product?.description}
        </span>

        <span>{product?.category}</span>

        <div className="flex w-[10.6rem] bg-[#F0F0F0] rounded-[3.8rem] p-3 justify-around">
          <button
            onClick={() => SetStepper((prev) => prev - 1)}
            disabled={stepper === 1}
          >
            <FiMinus />
          </button>

          <span>{stepper}</span>

          <button onClick={() => SetStepper((prev) => prev + 1)}>
            <FiPlus />
          </button>
        </div>

        <button
          className="bg-[#1E1E1E] text-white p-3 rounded-[3.8rem] w-[25%]"
          onClick={() => addToCart(product, stepper)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductDetail;
