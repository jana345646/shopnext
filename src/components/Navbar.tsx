"use client";

import { useContext } from "react";
import { ProductsContext } from "@/context/ProductsContext";
import Link from "next/link"; // this is a component in next to can navigate through the website without reloading the page
import { AuthContext } from "@/context/AuthContext";
import { SidebarContext } from "@/context/SidebarContext";
import { IoMenu } from "react-icons/io5";

export default function Navbar() {
  const productsData = useContext(ProductsContext);
  const authData = useContext(AuthContext);
  const sidebarData = useContext(SidebarContext);

  if (!productsData || !authData || !sidebarData) return null;

  const { setSelectedCategory, categories, categoriesError } = productsData;
  const { user, logout } = authData;
  const { setOpen } = sidebarData;

  return (
    <div className="w-full bg-[#1E1E1E] flex justify-between px-2 py-4 ">
      {/* Logo */}
      <div className="shrink-0">
        <p className="text-white font-bold text-lg">
          <span className="text-yellow-500">S</span>hopNext
        </p>

        <p className="text-[8px] text-white">ONLINE SHOPPING</p>
      </div>

      {/* Categories */}
      <div className="flex items-center gap-2 ] font-bold text-white text-[11px] mx-3">
        {!categoriesError && (
          <>
            <button
              onClick={() => setSelectedCategory("")}
              className="whitespace-nowrap hover:text-yellow-400"
            >
              All
            </button>

            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className="whitespace-nowrap hover:text-yellow-400"
              >
                {cat}
              </button>
            ))}
          </>
        )}
      </div>

      {/* Right */}
      <div className="flex items-center gap-2  text-white font-bold shrink-0">
        {!user ? (
          <>
            <Link href="/login" className="text-xs  hover:text-yellow-400">
              Login
            </Link>

            <Link href="/register" className="text-xs  hover:text-yellow-400">
              Sign Up
            </Link>
          </>
        ) : (
          <button onClick={logout} className="text-xs  hover:text-red-400">
            Logout
          </button>
        )}

        <button className="text-2xl" onClick={() => setOpen(true)}>
          <IoMenu />
        </button>
      </div>
    </div>
  );
}
