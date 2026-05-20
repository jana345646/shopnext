//dynamic route: by it we create only one page and it's content differs according to the different id's that will be sent to it.
// it's structure : inside app create folder named products (main part in url or base url) inside it we create new folder named [id] (square brackets to tell next that this pahe is a dynamic route and it's content will cchange according to the id) then inside it create page.tsx (the main page that will be displayed)
import ProductProvider from "@/context/ProductProvider";
import Navbar from "@/components/Navbar";
import ProductDetail from "@/components/ProductDetail";
import { Product } from "@/types";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

async function GetProductFromServer(id: string): Promise<Product | null> {
  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`);
    if (!res.ok) return null;

    const data: Product = await res.json();
    console.log("🔥 data fetched from server side");
    return data;
  } catch (error) {
    console.error("Server Fetch Error:", error);
    return null;
  }
}

export default async function Product({ params }: PageProps) {
  const { id } = await params;

  const serverData = await GetProductFromServer(id);

  return (
    <ProductProvider serverProduct={serverData} id={id}>
      <Navbar />
      <ProductDetail />
    </ProductProvider>
  );
}
