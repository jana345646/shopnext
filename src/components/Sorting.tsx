"use client";

import { useContext } from "react";
import { ProductsContext } from "@/context/ProductsContext";

function Sorting() {
  const productsData = useContext(ProductsContext);

  if (!productsData) return null;

  const { sortType, setSortType } = productsData;

  return (
    <div className="flex justify-end p-4">
      <select
        className="bg-[#1E1E1E] w-[9rem] text-white p-2 rounded-[0.3rem] cursor-pointer"
        value={sortType}
        onChange={(e) => {
          const value = e.target.value;

          if (value === "asc" || value === "desc") {
            // we make this to avoid any other value to be saved it the state if later any new value is added
            setSortType(value);
          }
        }}
      >
        <option value="asc">Lowest Price</option>
        <option value="desc">Highest Price</option>
      </select>
    </div>
  );
}

export default Sorting;
