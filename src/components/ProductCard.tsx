import { Product } from "@/types";
import Image from "next/image"; // this is a component in react that optimize the image and make lazy loading and resize the image and edit its formats
import { RiStarSLine } from "react-icons/ri";
import { CiHeart } from "react-icons/ci";
import { IoCartOutline } from "react-icons/io5";

export default function ProductCard({ product }: { product: Product }) {
  /*props = {
  product: { ... }
  }*/
  return (
    <div className="w-full mx-auto h-full flex flex-col items-center px-2 pb-4 bg-white rounded-md pt-4">
      <div className="relative w-[50%] aspect-square">
        <Image
          src={product.image}
          alt={product.title}
          fill //to make the image take the width and the height of it's parent {relative}
          className="object-contain " // to avoid croping the image
          unoptimized //aspect-square make the width and the height equal
        />
      </div>
      <div className="w-full h-12 flex items-center justify-center px-1">
        <span className="text-center font-medium text-[0.95rem] leading-tight tracking-normal line-clamp-2 block">
          {product.title}
        </span>
      </div>
      <div className="w-full flex justify-between items-center px-1">
        <span className="font-normal text-[1rem] leading-none tracking-normal">
          ${product.price}
        </span>
        <div className="flex gap-1">
          <CiHeart className="text-red-900 text-2xl" />
          <IoCartOutline className="text-xl" />
        </div>
      </div>
      <div className="flex">
        <RiStarSLine />
        <RiStarSLine />
        <RiStarSLine />
        <RiStarSLine />
        <RiStarSLine />
      </div>
    </div>
  );
}
