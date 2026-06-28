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
    <div className="w-full bg-[#1E1E1E] flex items-center px-8 py-4">
      <div className="flex-1 flex flex-col">
        <p className="text-white font-bold text-2xl">
          <span className="text-yellow-500">S</span>hopNext
        </p>
        <p className="font-normal text-[0.6rem] text-white">ONLINE SHOPPING</p>
      </div>

      <div className="flex-1 hidden md:flex justify-center items-center">
        <div className="flex gap-6 font-bold text-white items-center whitespace-nowrap">
          {!categoriesError && (
            <>
              <button
                className="cursor-pointer"
                onClick={() => setSelectedCategory("")}
              >
                All
              </button>

              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className="cursor-pointer"
                >
                  {cat}
                </button>
              ))}
            </>
          )}
        </div>
      </div>

      {/* RIGHT - AUTH + MENU */}
      <div className="flex-1 flex justify-end items-center gap-4 text-white font-bold">
        {!user ? (
          <>
            <Link href="/login" className="cursor-pinter">
              Login
            </Link>

            <Link href="/register" className="cursor-pinter">
              Sign Up
            </Link>
          </>
        ) : (
          <button onClick={logout} className="hover:text-red-400">
            Logout
          </button>
        )}

        {/* MENU ICON */}
        <button onClick={() => setOpen(true)} className="text-white text-3xl">
          <IoMenu />
        </button>
      </div>
    </div>
  );
}
export default Navbar;
