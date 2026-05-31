// //dynamic route: by it we create only one page and it's content differs according to the different id's that will be sent to it.
// // it's structure : inside app create folder named products (main part in url or base url) inside it we create new folder named [id] (square brackets to tell next that this pahe is a dynamic route and it's content will cchange according to the id) then inside it create page.tsx (the main page that will be displayed)
import ProductProvider from "@/context/ProductProvider";
import Navbar from "@/components/Navbar";
import ProductDetail from "@/components/ProductDetail";
import { Product } from "@/types";
import { fetchProduct } from "@/app/lib/api";

interface PageProps {
  params: Promise<{
    // this component will recieve a prop(id) , but this prop will be sent from the api so its type is promise
    id: string;
  }>;
}

export async function generateStaticParams() {
  try {
    const res = await fetch("https://fakestoreapi.com/products");
    if (!res.ok) return [];

    const products: Product[] = await res.json();

    return products.map((product) => ({
      id: product.id.toString(), //in next the params must be string
    }));
  } catch (error) {
    console.error("Failed to generate static params:", error);
    return [];
  }
}

export default async function Product({ params }: PageProps) {
  const { id } = await params;

  const productData = await fetchProduct(id);

  return (
    <ProductProvider serverProduct={productData} id={id}>
      <ProductDetail />
    </ProductProvider>
  );
}

//dynamic route: by it we create only one page and it's content differs according to the different id's that will be sent to it.
// it's structure : inside app create folder named products (main part in url or base url) inside it we create new folder named [id] (square brackets to tell next that this pahe is a dynamic route and it's content will cchange according to the id) then inside it create page.tsx (the main page that will be displayed)
