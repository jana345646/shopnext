import ProductsProvider from "@/context/ProductsProvider";
import ProductsClient from "@/components/ProductsClient";
import Navbar from "@/components/Navbar";
import { Product } from "@/types";
import { Metadata } from "next"; // this is a type in next
import { fetchProducts } from "./lib/api";

export const metadata: Metadata = {
  title: "Products",
  description: "Browse all products",
};

export default async function Products() {
  const ProductsData = await fetchProducts();

  return (
    <ProductsProvider productsData={ProductsData}>
      <ProductsClient />
    </ProductsProvider>
  );
}
