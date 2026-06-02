import ProductProvider from "@/context/ProductProvider";
import ProductDetail from "@/components/ProductDetail";
import { fetchProduct } from "@/lib/api";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Product({ params }: PageProps) {
  const { id } = await params;

  let productData;
  try {
    productData = await fetchProduct(id);
  } catch {
    notFound();
  }

  return (
    <ProductProvider serverProduct={productData} id={id}>
      <ProductDetail />
    </ProductProvider>
  );
}
