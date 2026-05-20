"use client";
import { useContext } from "react";
import { ProductContext } from "@/context/ProductContext";
import Image from "next/image";
import { RiStarSLine } from "react-icons/ri";

function ProductDetail() {
  const productData = useContext(ProductContext);

  if (!ProductContext) return null;

  const { product } = productData;

  return (
    <div className="w-full h-[40rem] flex justify-between px-[5rem] items-center gap-5">
      <div className="relative w-[20%] h-full">
        {product?.image && (
          <Image
            src={product.image}
            alt={product.title}
            unoptimized
            fill // طالما حاطة الـ Image جوه div relative، الـ fill بتخليها تملى الـ div صح
            className="object-contain"
          />
        )}
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-[Integral CF] font-bold text-[2.5rem]">
          {product?.title}
        </span>
        <div className="flex ">
          <RiStarSLine className="text-3xl" />
          <div className="w-full flex gap-5 ">
            <span className="text-xl">{product?.rating.rate} / 5</span>
            <span className="text-xl">{product?.rating.count}</span>
          </div>
        </div>
        <span className="text-[Satoshi] font-bold text-[1.5rem]">
          ${product?.price}
        </span>

        <span className="text-[Satoshi] text-center  font-normal text-[0.7rem] text-[#00000099] leading-[1.3rem]">
          {product?.description}
        </span>

        <span>{product?.category}</span>
        <button className="bg-[#1E1E1E] text-white p-3 rounded-[3.8rem] w-[25%] text-[Satoshi] font-medium text-base">
          Add to Cart
        </button>
      </div>
    </div>
  );
}
export default ProductDetail;
