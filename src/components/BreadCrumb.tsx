//breadcrumb it's a navigator that help the user to know his location in the site , and to make him navigate backward easily

import Link from "next/link";
import { Product } from "@/types";

function BreadCrumb({
  product,
  category,
}: {
  product?: Product;
  category?: string;
}) {
  return (
    <div className="bg-transparent text-lg text-gray-500 flex gap-2 py-2 pl-4 items-center w-full">
      <Link href="/" className="text-gray-500 hover:underline">
        Home
      </Link>

      {product && (
        <>
          <span>{">"}</span>
          <Link
            href={`/?category=${product.category}`} // after ? is the query parameter part
            className="hover:underline text-gray-500 capitalize"
          >
            {product.category}
          </Link>
          <span>{">"}</span>
          <span className="text-black font-medium">{product.title}</span>
        </>
      )}

      {!product && category && (
        <>
          <span>{">"}</span>
          <span className="text-black font-medium capitalize flex items-center gap-2">
            {category}
          </span>
        </>
      )}
    </div>
  );
}

export default BreadCrumb;

// this maens that it will go to the home page (/) and it will filter it according to the category , ? (string query selector) this url will take additional data , function(as the categry names has comma and spaces so it make it understandable to the browser)
