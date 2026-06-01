// //dynamic route: by it we create only one page and it's content differs according to the different id's that will be sent to it.
// // it's structure : inside app create folder named products (main part in url or base url) inside it we create new folder named [id] (square brackets to tell next that this pahe is a dynamic route and it's content will cchange according to the id) then inside it create page.tsx (the main page that will be displayed)

// import ProductProvider from "@/context/ProductProvider";
// import ProductDetail from "@/components/ProductDetail";
// import { fetchProduct } from "@/lib/api";
// import { notFound } from "next/navigation";

// interface PageProps {
//   params: Promise<{ id: string }>;
// }

// export default async function Product({ params }: PageProps) {
//   const { id } = await params;

//   const productData = await fetchProduct(id);

//   if (!productData) {
//     notFound();
//   }

//   return (
//     <ProductProvider serverProduct={productData} id={id}>
//       <ProductDetail />
//     </ProductProvider>
//   );
// }

import ProductProvider from "@/context/ProductProvider";
import ProductDetail from "@/components/ProductDetail";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Product({ params }: PageProps) {
  const { id } = await params;

  return (
    <ProductProvider serverProduct={null} id={id}>
      <ProductDetail />
    </ProductProvider>
  );
}
