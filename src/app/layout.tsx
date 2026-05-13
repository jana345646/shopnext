import type { Metadata } from "next";
import localFont from "next/font/local"; // tells next.js that the font exists locaaly in our project folder
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const beatrice = localFont({
  //local font is a function tahat make the project understands the local fonts
  // we use this v.name in this file only
  src: [
    {
      // لازم تقولي له يدخل فولدر fonts وبعدين beatrice-font-family
      path: "./fonts/beatrice-font-family/BeatriceDeckTRIAL-Regular-BF64829e9182459.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/beatrice-font-family/BeatriceTRIAL-Bold-BF64829e8fd7dc6.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-beatrice", // we use it with tailwind config file
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${beatrice.variable} font-sans`}>
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
