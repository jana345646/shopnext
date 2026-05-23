import ProductsProvider from "@/context/ProductsProvider";
import ProductsClient from "@/components/ProductsClient";
import Navbar from "@/components/Navbar";
import { Product } from "@/types";
import { Metadata } from "next"; // this is a type in next

export const metadata: Metadata = {
  title: "Products",
  description: "Browse all products",
};

async function getProductsFromServer(): Promise<Product[]> {
  try {
    const res = await fetch("https://fakestoreapi.com/products");
    if (!res.ok) return [];
    const data = await res.json();
    console.log("fetched from server");
    return data;
  } catch (error) {
    console.error("Server Fetch Error:", error);
    return [];
  }
}

async function getCategoriesFromServer(): Promise<Product[]> {
  try {
    const res = await fetch("https://fakestoreapi.com/products/categories");
    if (!res.ok) return [];
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Server Fetch Error:", error);
    return [];
  }
}

export default async function Products() {
  const serverData = await getProductsFromServer();

  return (
    <ProductsProvider initialProducts={serverData}>
      <Navbar />

      <ProductsClient />
    </ProductsProvider>
  );
}
