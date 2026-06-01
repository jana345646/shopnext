// //breadcrumb it's a navigator that help the user to know his location in the site , and to make him navigate backward easily
// "use client";
// import Link from "next/link"; // this is a component in netxt that navigate system in the site like a but better than it as it jelp user to navigate between the pages without reloading
// import { useContext } from "react";
// import { ProductsContext } from "@/context/ProductsContext";

// function BreadCrumb({ product }: any) {
//   const productsData = useContext(ProductsContext);

//   if (!product) return null;

//   // لو الـ context مش قاري لسبب ما، خليه يرجع كـ أمان
//   const setSelectedCategory = productsData
//     ? productsData.setSelectedCategory
//     : () => {};

//   return (
//     <>
//       <div className="text-sm text-gray-500 flex gap-2">
//         {/* عند الضغط على Home بنصفر الفئة عشان يعرض كل المنتجات */}
//         <Link href="/" onClick={() => setSelectedCategory("")}>
//           Home
//         </Link>

//         <span>{">"}</span>

//         <Link href="/" onClick={() => setSelectedCategory(product.category)}>
//           {product.category}
//         </Link>

//         <span>{">"}</span>

//         <span className="text-black font-medium">{product.title}</span>
//       </div>
//     </>
//   );
// }

// export default BreadCrumb;

//breadcrumb it's a navigator that help the user to know his location in the site , and to make him navigate backward easily

import Link from "next/link"; // this is a component in netxt that navigate system in the site like a but better than it as it jelp user to navigate between the pages without reloading
import { Product } from "@/types";
function BreadCrumb({ product }: Product) {
  if (!product) return null;

  return (
    <div className="text-lg text-gray-500 flex gap-2 my-4 pl-4">
      <Link href="/">Home</Link>

      <span>{">"}</span>
      <Link href={`/?category=${encodeURIComponent(product.category)}`}>
        {product.category}
      </Link>

      <span>{">"}</span>

      <span className="text-black font-medium">{product.title}</span>
    </div>
  );
}

export default BreadCrumb;

// this maens that it will go to the home page (/) and it will filter it according to the category , ? (string query selector) this url will take additional data , function(as the categry names has comma and spaces so it make it understandable to the browser)
