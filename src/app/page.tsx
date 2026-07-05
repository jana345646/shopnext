"use client";

import ProductsClient from "@/components/ProductsClient";
import { ProductsContext } from "@/context/ProductsContext";
import { useContext, useEffect } from "react";
import BreadCrumb from "@/components/BreadCrumb";
import { useSearchParams } from "next/navigation"; //this is a hook that reads the query parameter from the url (part after ? , it's an additional data we send it with the url)

export default function Products() {
  const productsData = useContext(ProductsContext);

  const searchParams = useSearchParams(); // this hook returns an object with the query parameters which was in the url
  const categoryParam = searchParams.get("category"); // return the value which key is called category

  if (!productsData) return null;
  const { selectedCategory, setSelectedCategory } = productsData;

  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    } else {
      setSelectedCategory("");
    }
  }, [categoryParam, setSelectedCategory]);

  return (
    <div className=" bg-[#E9E9E9]">
      {selectedCategory && <BreadCrumb category={selectedCategory} />}
      <ProductsClient />
    </div>
  );
}
