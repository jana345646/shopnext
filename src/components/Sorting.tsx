// "use client";

// import { useContext } from "react";
// import { ProductsContext } from "@/context/ProductsContext";
// import { CategoryContext } from "@/context/CategoriesContext";

// function Sorting() {
//   const productsData = useContext(ProductsContext);
//   const categoriesData = useContext(CategoryContext);

//   if (!productsData || !categoriesData) return null;

//   const { products, setFilteredProducts, sortType, SetSortType } = productsData;

//   function sorting(type: "asc" | "desc") {
//     SetSortType(type);

//     if (type === "asc") {
//       const asc = [...products].sort((a, b) => a.price - b.price);
//       setFilteredProducts(asc);
//     }

//     if (type === "desc") {
//       const desc = [...products].sort((a, b) => b.price - a.price);
//       setFilteredProducts(desc);
//     }
//   }

//   return (
//     <div className="flex justify-end">
//       <select
//         className="bg-[#1E1E1E] text-white p-2 rounded-[0.3rem]"
//         value={sortType}
//         onChange={(e) => sorting(e.target.value as "asc" | "desc")}
//       >
//         <option value="asc">Ascending</option>
//         <option value="desc">Descending</option>
//       </select>
//     </div>
//   );
// }

// export default Sorting;

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
        onChange={(e) => setSortType(e.target.value as "asc" | "desc")}
      >
        <option value="asc">Lowest Price</option>
        <option value="desc">Highest Price</option>
      </select>
    </div>
  );
}

export default Sorting;
