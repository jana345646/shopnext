"use client";

import { useContext } from "react";
import Link from "next/link";
import { IoClose, IoCartOutline, IoHomeOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";

import { SidebarContext } from "@/context/SidebarContext";
import { CartContext } from "@/context/CartContext";
import { FavoriteContext } from "@/context/FavoriteContext";
import { ProductsContext } from "@/context/ProductsContext";

export default function Sidebar() {
  const { open, setOpen } = useContext(SidebarContext);

  const cartData = useContext(CartContext);
  const favoriteData = useContext(FavoriteContext);
  const productsData = useContext(ProductsContext);

  if (!cartData || !favoriteData || !productsData) return null;

  const { cart, mounted } = cartData;
  const { favorite } = favoriteData;
  const { categories, setSelectedCategory } = productsData;

  const cartCount = mounted
    ? cart.reduce((total, item) => total + item.quantity, 0)
    : 0;

  const favoriteCount = mounted ? favorite.length : 0;

  const linkClass =
    "flex items-center gap-3 p-2 rounded hover:bg-white/10 transition";

  const badgeClass =
    "ml-auto bg-yellow-500 text-black text-xs px-2 py-0.5 rounded-full";

  return (
    <>
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-40"
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-[270px] bg-[#1E1E1E] text-white z-50 transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* CLOSE BUTTON */}
        <div className="flex justify-end">
          <button className="text-2xl p-4" onClick={() => setOpen(false)}>
            <IoClose />
          </button>
        </div>

        <div className="flex flex-col gap-2 p-4">
          {/* HOME */}
          <Link href="/" onClick={() => setOpen(false)} className={linkClass}>
            <IoHomeOutline className="text-xl" />
            <span>Home</span>
          </Link>

          {/* CART */}
          <Link
            href="/cart"
            onClick={() => setOpen(false)}
            className={linkClass}
          >
            <IoCartOutline className="text-xl" />
            <span>Cart</span>
            <span className={badgeClass}>{cartCount}</span>
          </Link>

          {/* FAVORITES */}
          <Link
            href="/favorite"
            onClick={() => setOpen(false)}
            className={linkClass}
          >
            <FaRegHeart className="text-xl" />
            <span>Favourites</span>
            <span className={badgeClass}>{favoriteCount}</span>
          </Link>

          {/* divider */}
          <div className="border-t border-white/20 my-2" />

          {/* CATEGORIES (mobile only) */}
          <div className="block md:hidden">
            <div className="text-sm text-gray-300 px-2">Categories</div>

            <button
              onClick={() => {
                setSelectedCategory("");
                setOpen(false);
              }}
              className={linkClass}
            >
              All
            </button>

            {categories?.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setOpen(false);
                }}
                className={linkClass}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
