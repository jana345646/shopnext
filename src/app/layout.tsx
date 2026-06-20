// // layout.tsx file is a wrapper that all the pages run inside it and we put in it the components that will be displayes in all the pages

//className={inter.className} we apply this font on the body , classname is a property in the inter object to apply the font class to the body
//we are using the provider

// layout.tsx file is a wrapper that all the pages run inside it and we put in it the components that will be displayes in all the pages
import "./globals.css";
import { Inter } from "next/font/google";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";

import ProductsProvider from "@/context/ProductsProvider";
import CategoriesProvider from "@/context/CategoriesProvider";
import { CartProvider } from "@/context/CartProvider";
import { FavoriteProvider } from "@/context/FavoriteProvider";
import AuthProvider from "@/context/AuthProvider";
import SidebarProvider from "@/context/SidebarProvider";

import { Toaster } from "react-hot-toast";

import Sidebar from "@/components/Sidebar";
import SidebarProvider from "@/context/SidebarProvider";

export const metadata = {
  title: "ShopNext",
  description: "Online shopping app",
};

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "700", "500"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <CategoriesProvider>
            <ProductsProvider>
              <CartProvider>
                <FavoriteProvider>
                  <SidebarProvider>
                    <Navbar />
                    <Sidebar />
                    <Toaster />
                    <main>{children}</main>
                    <Footer />
                  </SidebarProvider>
                </FavoriteProvider>
              </CartProvider>
            </ProductsProvider>
          </CategoriesProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
