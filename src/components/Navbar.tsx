"use client";

import { useContext } from "react";
import { ProductsContext } from "@/context/ProductsContext";
import Link from "next/link";
import { AuthContext } from "@/context/AuthContext";
import { SidebarContext } from "@/context/SidebarContext";
import { IoMenu, IoCartOutline } from "react-icons/io5";
import { CartContext } from "@/context/CartContext";

function Navbar() {
  const productsData = useContext(ProductsContext);
  const authData = useContext(AuthContext);
  const sidebarData = useContext(SidebarContext);
  const cartData = useContext(CartContext);

  if (!productsData || !authData || !sidebarData || !cartData) return null;

  const { setSelectedCategory, categories, categoriesError } = productsData;
  const { user, logout } = authData;
  const { setOpen } = sidebarData;
  const { setIsCartOpen } = cartData;

  return (
    <div className="w-full bg-[#1E1E1E] flex items-center px-8 py-4">
      {/* LEFT */}
      <div className="flex-1 flex flex-col">
        <p className="text-white font-bold text-2xl">
          <span className="text-yellow-500">S</span>hopNext
        </p>
        <p className="font-normal text-[0.6rem] text-white">ONLINE SHOPPING</p>
      </div>

      {/* CENTER */}
      <div className="flex-1 hidden md:flex justify-center items-center">
        <div className="flex gap-6 font-bold text-white items-center whitespace-nowrap">
          {!categoriesError && (
            <>
              <button onClick={() => setSelectedCategory("")}>All</button>

              {categories.map((cat) => (
                <button key={cat} onClick={() => setSelectedCategory(cat)}>
                  {cat}
                </button>
              ))}
            </>
          )}
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex-1 flex justify-end items-center gap-5 text-white font-bold">
        <div
          className="relative cursor-pointer hover:text-yellow-400 transition"
          onClick={() => setIsCartOpen(true)}
        >
          <IoCartOutline className="text-2xl" />
        </div>

        {!user ? (
          <>
            <Link href="/login">Login</Link>
            <Link href="/register">Sign Up</Link>
          </>
        ) : (
          <button onClick={logout} className="hover:text-red-400">
            Logout
          </button>
        )}

        {/* MENU */}
        <button onClick={() => setOpen(true)} className="text-3xl">
          <IoMenu />
        </button>
      </div>
    </div>
  );
}

export default Navbar;
