"use client";

import { useContext } from "react";
import Link from "next/link";
import { IoClose } from "react-icons/io5";
import { SidebarContext } from "@/context/SidebarContext";
import CartContext from "@/context/CartContext";
import { IoCartOutline } from "react-icons/io5";

export default function Sidebar() {
  const { open, setOpen } = useContext(SidebarContext);
  const cartData = useContext(CartContext);
  const { cart, addToCart } = cartData;

  if (!cartData) return null;
  const cartCount = cart.reduce((total, item) => {
    // reduce it loops on the array to return only one value
    return total + item.quantity;
  }, 0); // the initial value is zero

  return (
    <>
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-40"
        />
      )}

      <div
        className={`fixed top-0 left-0 h-full w-[250px] bg-[#1E1E1E] text-white z-50 transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button className="text-2xl p-4" onClick={() => setOpen(false)}>
          <IoClose />
        </button>

        {/* LINKS */}
        <div className="flex flex-col gap-4 p-4">
          <Link href="/" onClick={() => setOpen(false)}>
            Home
          </Link>

          <Link href="/favorites" onClick={() => setOpen(false)}>
            Favorites
          </Link>

          {/* 🛒 CART INSIDE SIDEBAR */}
          <Link
            href="/cart"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2"
          >
            <IoCartOutline className="text-xl" />

            <span className="ml-auto bg-yellow-500 text-black text-xs px-2 rounded-full">
              {cartCount}
            </span>
          </Link>

          <span className="ml-auto bg-yellow-500 text-black text-xs px-2 rounded-full">
            {cartCount}
          </span>
        </div>
      </div>
    </>
  );
}
