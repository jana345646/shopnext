// layout.tsx file is a wrapper that all the pages run inside it and we put in it the components that will be displayes in all the pages
import "./globals.css";
import { Inter } from "next/font/google"; // this is a package in next that gets the fonts from the fonts system in next
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductsProvider from "@/context/ProductsProvider";
import CategoriesProvider from "@/context/CategoriesProvider";
import { Metadata } from "next";

export const metadata = {
  title: "ShopNext",
  description: "Online shopping app",
};

const inter = Inter({
  // inter is a object we create it to save the settings of the font
  //Inter is a function in next fint systems that get the font and edit it's settings
  subsets: ["latin"], // is the language of the font
  weight: ["400", "700", "500"], //font weight of the font to download this weights only
});

export default function RootLayout({
  children, // this is a children prop tha layout component recieve it automatically from next.js
}: {
  children: React.ReactNode; // the type of the children could be anything react can render it(text , component , html element , ..)
}) {
  // in body we call the beatprice variable to be applied on the whole project , if we didnt use it so use the sans font
  return (
    <html lang="en">
      <body className={inter.className}>
        <CategoriesProvider>
          <ProductsProvider>
            <main>{children}</main>
          </ProductsProvider>
        </CategoriesProvider>
        <Footer />
      </body>
    </html>
  );
}
//className={inter.className} we apply this font on the body , classname is a property in the inter object to apply the font class to the body
//we are using the provider
