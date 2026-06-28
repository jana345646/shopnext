"use client";

import { useContext } from "react";
import { ProductsContext } from "@/context/ProductsContext";
import Link from "next/link";
import { AuthContext } from "@/context/AuthContext";
import { SidebarContext } from "@/context/SidebarContext";
import { IoMenu } from "react-icons/io5";
import { useRouter } from "next/navigation"; // it's a hook that help us to navigate between the pages but according to a specific logic

function Navbar() {
  const productsData = useContext(ProductsContext);
  const authData = useContext(AuthContext);
  const { setOpen } = useContext(SidebarContext);

  if (!productsData || !authData) return null;
  const { setSelectedCategory, categories, categoriesError } = productsData;
  const { user, logout } = authData;

  return (
    <div className="w-full bg-[#1E1E1E] flex items-center justify-between px-2 sm:px-4 md:px-6 lg:px-8 py-4">
      {/* Logo */}
      <div className="shrink-0">
        <p className="text-white font-bold text-lg sm:text-xl md:text-2xl">
          <span className="text-yellow-500">S</span>hopNext
        </p>

        <p className="text-[8px] sm:text-[9px] md:text-[10px] text-white">
          ONLINE SHOPPING
        </p>
      </div>

      {/* Categories */}
      <div className="flex items-center gap-2 sm:gap-3 md:gap-5 lg:gap-6 font-bold text-white text-[11px] sm:text-xs md:text-sm lg:text-base mx-3">
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
      <div className="flex items-center gap-2 sm:gap-3 md:gap-4 text-white font-bold shrink-0">
        {!user ? (
          <>
            <Link
              href="/login"
              className="text-xs sm:text-sm md:text-base hover:text-yellow-400"
            >
              Login
            </Link>

            <Link
              href="/register"
              className="text-xs sm:text-sm md:text-base hover:text-yellow-400"
            >
              Sign Up
            </Link>
          </>
        ) : (
          <button
            onClick={logout}
            className="text-xs sm:text-sm md:text-base hover:text-red-400"
          >
            Logout
          </button>
        )}

        <button className="text-2xl sm:text-3xl" onClick={() => setOpen(true)}>
          <IoMenu />
        </button>
      </div>
    </div>
  );
}
export default Navbar;
