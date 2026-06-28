// layout.tsx file is a wrapper that all the pages run inside it

import "./globals.css";
import { Inter } from "next/font/google"; // this is a function from google fonts that get this font from google fonts
import { Toaster } from "react-hot-toast"; // toaster is a component inside the react-hot-toast library that help the developer to display a notification to the user (dont stop th app and dissaperes automatic after few minutes not like the alter box)

//static components that will be shared through the whole project

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";

// we add the providers here as the providers provides a shared state so we import it here to be shared with all the children (components , pages)

import ProductsProvider from "@/context/ProductsProvider";
import { CartProvider } from "@/context/CartProvider";
import { FavoriteProvider } from "@/context/FavoriteProvider";
import AuthProvider from "@/context/AuthProvider";
import SidebarProvider from "@/context/SidebarProvider";
import { Metadata } from "next";
// metadata is an object in next.js , when next see it ti converts it as a code in the head in the html file , (it differs from writting it in the html , as we write it here one time only) (bsst paractice to make each page has it's own metadata , but we also write metadata here to be a fallback for any page that dont have a title or description)

export const metadata: Metadata = {
  title: "ShopNext",
  description: "Online shopping app",
};

const inter = Inter({
  // inter now holds an object with subsets(type of letters 'latin includes english , french , spanish') and weights we must download them to can use them correctly in taillwind
  subsets: ["latin"],
  weight: ["400", "700", "500"],
});

export default function RootLayout({
  children, // next.js sends the children automatically to the layout
}: {
  children: React.ReactNode;
}) {
  // in the body we must put this code to apply the font on the website
  // the order of the providers depends on which one needs the other
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
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
        </AuthProvider>
      </body>
    </html>
  );
}
