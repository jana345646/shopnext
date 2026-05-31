// "use client";
// import { ProductContext } from "./ProductContext";
// import { useState, useEffect } from "react";
// import { Product } from "@/types";
// import { log } from "console";

// function ProductProvider({
//   children,
//   serverProduct,
//   id,
// }: {
//   children: React.ReactNode;
//   serverProduct: Product | null;
//   id: string;
// }) {
//   const [product, SetProduct] = useState<Product | null>(null);
//   const [stepper, SetStepper] = useState<number>(1);

//   async function GetProductFromClient() {
//     const res = await fetch(`https://fakestoreapi.com/products/${id}`);
//     const data: Product = await res.json();
//     console.log("data fetched from clien side");
//     SetProduct(data);
//   }

//   useEffect(() => {
//     if (serverProduct !== null) {
//       SetProduct(serverProduct);
//     } else if (serverProduct === null) {
//       GetProductFromClient();
//     }
//   }, [serverProduct, id]);

//   return (
//     <ProductContext.Provider value={{ product, stepper, SetStepper }}>
//       {children}
//     </ProductContext.Provider>
//   );
// }
// export default ProductProvider;

"use client";
import { ProductContext } from "./ProductContext";
import { useState, useEffect } from "react";
import { Product } from "@/types";
import { fetchProduct } from "@/app/lib/api";
function ProductProvider({
  children,
  serverProduct,
  id,
}: {
  children: React.ReactNode;
  serverProduct: Product | null;
  id: string;
}) {
  const [product, SetProduct] = useState<Product | null>(null);
  const [stepper, SetStepper] = useState<number>(1);

  useEffect(() => {
    async function loadProduct() {
      const data = await fetchProduct(id);

      if (data) {
        SetProduct(data);
      }
    }

    loadProduct();
  }, [id]);

  return (
    <ProductContext.Provider
      value={
        {
          product: product,
          SetProduct: SetProduct,
          stepper: stepper,
          SetStepper: SetStepper,
        } as unknown as any
      }
    >
      {children}
    </ProductContext.Provider>
  );
}
export default ProductProvider;
