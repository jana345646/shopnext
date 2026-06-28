import { Product } from "@/types";
import Image from "next/image"; // this is a component in next that make the image to be lazy loading(will be displayed when we reach it in the page) ,responsive , image optimization
import Link from "next/link";
import { IoCartOutline } from "react-icons/io5";
import RatingStars from "./RatingStars";
import FavoriteButton from "./FavoriteButton";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.id}`} className="w-full">
      <div className="w-full flex flex-col items-center px-2 py-4 h-full bg-white rounded-md hover:shadow-lg">
        <div className="relative w-[50%] aspect-square">
          <Image
            src={product.image}
            alt={product.title}
            className="object-contain" // it dispaly the whole image without any cuts , aspect-square it makes ,  the div a square shape (w = h)
            fill
            unoptimized
          />
        </div>

        <span className="text-center font-medium line-clamp-2 mt-5">
          {product.title}
        </span>

        <RatingStars rate={product.rating.rate} />
        <div className="w-full flex justify-between px-1 mt-2">
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
