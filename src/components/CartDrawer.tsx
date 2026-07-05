"use client";
import { CartContext } from "@/context/CartContext";
import { useContext } from "react";
import Image from "next/image";
import { FiMinus, FiPlus } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import Link from "next/link";
import toast from "react-hot-toast";
import { CartProduct } from "@/types";

export default function CartDrawer() {
  const cartData = useContext(CartContext);
  if (!cartData) return null;

  const { isCartOpen, setIsCartOpen, cart, dispatch } = cartData;

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
      dispatch({ type: "REMOVE_ITEM", payload: { id: item.id } });
    } else {
      dispatch({
        type: "UPDATE_QTY",
        payload: { id: item.id, quantity: item.quantity - 1 },
      });
    }
  }

  function removeItem(item: CartProduct) {
    dispatch({
      type: "REMOVE_ITEM",
      payload: { id: item.id },
    });
  }

  function handleCheckout() {
    toast.success("Order placed successfully!");

    dispatch({
      type: "CLEAR_CART",
    });

    setIsCartOpen(false);
  }

  const total = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  return (
    <>
      {isCartOpen && (
        <div className="flex flex-col">
          {/* overlay */}
          <div
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/30 z-40"
          />

          {/* drawer */}
          <div className="fixed top-0 right-0 w-[40%] h-screen bg-[#1E1E1E] z-50 text-white pb-8 overflow-y-auto">
            <h1 className="text-white text-3xl text-center py-[4rem]">
              My cart
            </h1>

            <div className="pl-[1rem] pr-[2rem]">
              {/* EMPTY STATE */}
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-[50vh] w-[80%] mx-auto">
                  <h1 className="text-2xl font-bold">Your cart is empty</h1>

                  <Link href="/">
                    <button
                      className="mt-4 border-2 border-[#F0F0F0]  hover:border-gray-600 px-6 py-2 rounded"
                      onClick={() => setIsCartOpen(false)}
                    >
                      Continue Shopping
                    </button>
                  </Link>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex gap-4 items-start mb-6">
                    <div className="relative w-16 h-[10vh] flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        unoptimized
                        className="object-contain"
                      />
                    </div>

                    <div className="flex flex-col gap-1 flex-1">
                      <div className="flex gap-3">
                        <p className="text-lg line-clamp-2">{item.title}</p>

                        <button
                          onClick={() => removeItem(item)}
                          className="absolute right-4 p-2 bg-gray-600 rounded"
                        >
                          <MdDelete className="text-2xl cursor-pointer hover:text-red-600 text-white" />
                        </button>
                      </div>

                      <p className="text-base">${item.price * item.quantity}</p>

                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-between w-28 h-9 bg-gray-600 rounded-full px-3 mt-2">
                          <button onClick={() => editRemoveButton(item)}>
                            <FiMinus />
                          </button>

                          <span>{item.quantity}</span>

                          <button onClick={() => editAddButton(item)}>
                            <FiPlus />
                          </button>
                        </div>
                      </div>

                      <div className="w-[90%] h-[0.1vh] bg-white mt-5" />
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <>
                <div className="flex justify-around mt-[3rem]">
                  <p className="text-xl">Subtotal</p>
                  <span className="text-xl">${total.toFixed(2)}</span>
                </div>

                <div className="w-full flex justify-around mt-5 ">
                  <Link href="/cart">
                    <button
                      className="border-2 border-[#F0F0F0] cursor-pointer hover:border-gray-600 p-2 rounded-[0.5rem]"
                      onClick={() => setIsCartOpen(false)}
                    >
                      View cart
                    </button>
                  </Link>

                  <button
                    className="border-2 border-[#F0F0F0] cursor-pointer hover:border-gray-600 p-2 rounded-[0.5rem]"
                    onClick={handleCheckout}
                  >
                    Checkout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
