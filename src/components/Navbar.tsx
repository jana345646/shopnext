"use client";
import { useContext } from "react";
import { ProductsContext } from "@/context/ProductsContext";
import { CategoryContext } from "@/context/CategoriesContext";
import { IoCartOutline } from "react-icons/io5";
import CartContext from "@/context/CartContext";
import { ProductContext } from "@/context/ProductContext";
import Link from "next/link";

function Navbar() {
  const productsData = useContext(ProductsContext);
  const categoriesData = useContext(CategoryContext);
  const cartData = useContext(CartContext);
  const productData = useContext(ProductContext);

  if (!productsData || !categoriesData || !cartData) return null;

  const { setSelectedCategory, selectedCategory } = productsData;
  const { category, error } = categoriesData;
  const { cart, addToCart } = cartData;
  const { product } = productData;

  const cartCount = cart.reduce((total, item) => {
    // reduce it loops on the array to return only one value
    return total + item.quantity;
  }, 0); // the initial value is zero

  return (
    <div className="w-full bg-[#1E1E1E] flex justify-between px-[2rem] py-4 items-center">
      <div className="flex flex-col">
        <p className="text-white font-bold text-2xl">
          <span className="text-yellow-500">S</span>hopNext
        </p>
        <p className="font-normal text-[0.6rem] text-white">ONLINE SHOPPING</p>
      </div>
      <div className="flex gap-8 font-normal text-lg text-white">
        {!error && ( // if there is no error
          <div className="w-full flex gap-3">
            <button
              className="rounded-[0.3rem] font-bold p-2 text-white"
              onClick={() => setSelectedCategory("")}
            >
              All
            </button>

            {category?.map((cat) => (
              <button
                className="rounded-[0.3rem] font-bold p-2 text-white"
                key={cat as unknown as string}
                onClick={() => setSelectedCategory(cat as unknown as string)}
              >
                {cat as unknown as string}
              </button>
            ))}

            <Link
              href="/login"
              className="rounded-[0.3rem] font-bold p-2 text-white"
            >
              LogIn
            </Link>

            <div className=" flex relative pt-3">
              <IoCartOutline className="text-2xl text-white" />

              <span className="absolute -top-4 -right-1 rounded-full px-2 text-sm text-white pt-3">
                {cartCount}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default Navbar;
