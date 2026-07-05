"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import { CartContext } from "@/context/CartContext";
import { useContext } from "react";
import Image from "next/image";
import { FiMinus, FiPlus } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import Link from "next/link";
import SummarySectionCart from "@/components/SummarySectionCart";
import { CartProduct } from "@/types";

export default function CartPage() {
  const cartData = useContext(CartContext);

  if (!cartData) return null;

  const { cart, dispatch, storageAvailable } = cartData;

  function editAddButton(item: CartProduct) {
    dispatch({
      type: "UPDATE_QTY",
      payload: {
        id: item.id,
        quantity: item.quantity + 1,
      },
    });
  }

  function editRemoveButton(item: CartProduct) {
    if (item.quantity === 1) {
      dispatch({
        type: "REMOVE_ITEM",
        payload: { id: item.id },
      });
    } else {
      dispatch({
        type: "UPDATE_QTY",
        payload: {
          id: item.id,
          quantity: item.quantity - 1,
        },
      });
    }
  }

  function removeItem(item: CartProduct) {
    dispatch({
      type: "REMOVE_ITEM",
      payload: { id: item.id },
    });
  }

  function deleteCart() {
    dispatch({
      type: "CLEAR_CART",
    });
  }

  return (
    <ProtectedRoute next="/cart">
      {!storageAvailable && (
        <div className="text-2xl h-screen text-center mt-8 rounded mb-4">
          Your cart won't be saved after refresh.
        </div>
      )}

      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold">Your cart is empty</h1>
          <Link href={"/"}>
            <button className="mt-4 border-2 border-[#F0F0F0] hover:border-[#1E1E1E] px-6 py-2 rounded">
              Continue Shopping
            </button>
          </Link>
        </div>
      ) : (
        <div className="flex flex-col w-full py-[2rem] px-[4rem]">
          <div className="flex justify-between mb-4">
            <p className="font-bold text-4xl">Shopping Cart</p>

            <button
              onClick={deleteCart}
              className="border-2 border-[#F0F0F0] hover:border-[#1E1E1E] w-[7%] rounded-[0.3rem] text-lg"
            >
              Clear all
            </button>
          </div>

          <div className="grid grid-cols-3 text-center mt-5 text-[1.3rem] font-medium">
            <p>Name</p>
            <p>Quantity</p>
            <p>SubTotal</p>
          </div>

          <div>
            {cart.map((item) => (
              <div key={item.id} className="grid grid-cols-3 items-center">
                <div className="flex items-center gap-5 ">
                  <div className="relative w-[15%] h-[15vh]">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      unoptimized
                      className="object-contain"
                    />
                  </div>
                  <p className="text-lg">{item.title}</p>
                </div>

                <div className="flex justify-center">
                  <div className="flex w-[10rem] h-10 bg-[#F0F0F0] rounded-[3rem] justify-around items-center">
                    {/* 👇 تم تعديل الزرار هنا وشيلنا الـ disabled */}
                    <button onClick={() => editRemoveButton(item)}>
                      <FiMinus />
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() => editAddButton(item)}
                      disabled={item.quantity >= 10}
                      className={item.quantity >= 10 ? "opacity-50" : ""}
                    >
                      <FiPlus />
                    </button>
                  </div>
                </div>

                <div className="relative flex items-center justify-center">
                  <span className="text-lg">{item.price * item.quantity}</span>

                  <button
                    onClick={() => removeItem(item)}
                    className="absolute right-4 bg-[#F0F0F0] p-2 rounded"
                  >
                    <MdDelete className="text-2xl cursor-pointer hover:text-red-600 " />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <SummarySectionCart />
        </div>
      )}
    </ProtectedRoute>
  );
}
