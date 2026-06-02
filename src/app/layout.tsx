import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductsProvider from "@/context/ProductsProvider";
import CategoriesProvider from "@/context/CategoriesProvider";
import CartProvider from "@/context/CartProvider";
import FavoriteProvider from "@/context/FavoriteProvider";
import { fetchCategories, fetchProducts } from "@/lib/api";
import { Product } from "@/types";

export const metadata = {
  title: "ShopNext",
  description: "Online shopping app",
};

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "700", "500"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let categories: string[] = [];
  let products: Product[] = [];

  try {
    [categories, products] = await Promise.all([
      fetchCategories(),
      fetchProducts(),
    ]);
  } catch (error) {
    console.error("Root layout fetch failed:", error);
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        <CategoriesProvider initialCategories={categories}>
          <ProductsProvider initialProducts={products}>
            <CartProvider>
              <FavoriteProvider>
                <Navbar />
                <main>{children}</main>
              </FavoriteProvider>
            </CartProvider>
          </ProductsProvider>
        </CategoriesProvider>
        <Footer />
      </body>
    </html>
  );
}
