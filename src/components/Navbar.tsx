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
      <div>
        <p className="text-white font-bold text-lg md:text-xl lg:text-2xl">
          <span className="text-yellow-500">S</span>
          hopNext
        </p>

        <p className="text-[0.5rem] text-white md:text-[0.6rem] lg:text-[0.7rem]">
          ONLINE SHOPPING
        </p>
      </div>

      {/* Categories */}
      <div className="flex gap-2 font-bold text-white text-[0.8rem] md:text-[0.9rem] md:gap-3 lg:text-[1.1rem] lg:gap-4">
        {!categoriesError && (
          <>
            <button
              onClick={() => setSelectedCategory("")}
              className="hover:text-yellow-500"
            >
              All
            </button>

            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className=" hover:text-yellow-500"
              >
                {cat}
              </button>
            ))}
          </>
        )}
      </div>

      {/* Right */}
      <div className="flex items-center gap-2 text-white font-bold ">
        {!user ? (
          <>
            <Link
              href="/login"
              className="text-[0.8rem]  hover:text-yellow-500 md:text-[0.9rem] lg:text-[1rem]"
            >
              Login
            </Link>

            <Link
              href="/register"
              className="text-[0.8rem]  hover:text-yellow-500 md:text-[0.9rem] lg:text-[1rem]"
            >
              Sign Up
            </Link>
          </>
        ) : (
          <button
            onClick={logout}
            className="text-[0.8rem]  hover:text-red-500 md:text-[0.9rem] lg:text-[1rem]"
          >
            Logout
          </button>
        )}

        <button className="text-xl md:text-2xl" onClick={() => setOpen(true)}>
          <IoMenu />
        </button>
      </div>
    </div>
  );
}
