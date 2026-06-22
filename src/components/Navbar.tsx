"use client";
import { useContext } from "react";
import { ProductsContext } from "@/context/ProductsContext";
import { CategoryContext } from "@/context/CategoriesContext";
import { IoCartOutline } from "react-icons/io5";
import Link from "next/link";
import { AuthContext } from "@/context/AuthContext";
import Sidebar from "@/components/Sidebar";
import { SidebarContext } from "@/context/SidebarContext";
import { IoMenu } from "react-icons/io5";
import CartDrawer from "./CartDrawer";

function Navbar() {
  const productsData = useContext(ProductsContext);
  const categoriesData = useContext(CategoryContext);
  const authData = useContext(AuthContext);
  const { setOpen } = useContext(SidebarContext);

  if (!productsData || !categoriesData || !authData) return null;
  const { setSelectedCategory, selectedCategory } = productsData;
  const { category, error } = categoriesData;
  const { user, logout } = authData;

  return (
    <div className="w-full bg-[#1E1E1E] flex items-center px-8 py-4">
      {/* LEFT - LOGO */}
      <div className="flex-1 flex flex-col">
        <p className="text-white font-bold text-2xl">
          <span className="text-yellow-500">S</span>hopNext
        </p>
        <p className="font-normal text-[0.6rem] text-white">ONLINE SHOPPING</p>
      </div>

      {/* CENTER - CATEGORIES */}
      {/* CENTER - CATEGORIES */}
      <div className="flex-1 hidden md:flex justify-center items-center">
        <div className="flex gap-6 font-bold text-white items-center whitespace-nowrap">
          {!error && (
            <>
              <button
                className="cursor-pointer"
                onClick={() => setSelectedCategory("")}
              >
                All
              </button>

              {category?.map((cat) => (
                <button
                  key={cat as string}
                  onClick={() => setSelectedCategory(cat as string)}
                  className="cursor-pointer"
                >
                  {cat as string}
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
