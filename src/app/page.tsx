import ProductsClient from "@/components/ProductsClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products",
  description: "Browse all products",
};

interface PageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function Products({ searchParams }: PageProps) {
  const { category } = await searchParams;

  return <ProductsClient categoryData={category || ""} />;
}
