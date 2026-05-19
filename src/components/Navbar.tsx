"use client";
import { useContext } from "react";
import { ProductsContext } from "@/context/ProductsContext";
import { CategoryContext } from "@/context/CategoriesContext";

function Navbar() {
  const productsData = useContext(ProductsContext);
  const categoriesData = useContext(CategoryContext);

  if (!productsData || !categoriesData) return null;

  const { setSelectedCategory, selectedCategory } = productsData;
  const { category, error } = categoriesData;

  return (
    <div className="w-full bg-[#1E1E1E] flex justify-between px-[5rem] py-4 items-center">
      <div className="flex flex-col">
        <p className="text-white font-bold text-2xl">
          <span className="text-yellow-500">S</span>hopNext
        </p>
        <p className="font-normal text-[0.6rem] text-white">ONLINE SHOPPING</p>
      </div>
      <div className="flex gap-8 font-normal text-lg text-white">
        {!error && (
          <div className="w-full flex gap-3">
            <button
              className="rounded-[0.3rem] font-bold p-2 text-white"
              onClick={() => setSelectedCategory("")}
            >
              All
            </button>

            {category?.map((cat) => (
              <button
                className="rounded-[0.3rem] font-bold p-2 text-white"
                key={cat}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
export default Navbar;
