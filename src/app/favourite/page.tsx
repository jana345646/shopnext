"use client";

import { FavoriteContext } from "@/context/FavoriteContext";
import { CartContext } from "@/context/CartContext";
import { useContext } from "react";
import Image from "next/image";
import { MdDelete } from "react-icons/md";

export default function Favourite() {
  const favouriteData = useContext(FavoriteContext);
  const cartData = useContext(CartContext);

  if (!favouriteData || !cartData) return null;

  const { favorite, mounted } = favouriteData;
  const { dispatch } = favouriteData;
  const { dispatch: cartDispatch } = cartData;

  function favouriteToggle(item) {
    if (!item?.id) return;
    dispatch({
      type: "TOGGLE_FAVOURITE",
      payload: {
        id: item.id,
        title: item.title,
        image: item.image,
        price: item.price,
        quantity: 1,
      },
    });
  }

  function addToCart(item) {
    cartDispatch({
      type: "ADD_ITEM",
      payload: {
        id: item.id,
        title: item.title,
        image: item.image,
        price: item.price,
        quantity: 1,
      },
    });
  }

  if (!mounted) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  if (favorite.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <p className="text-xl font-semibold mt-4">
          No favourites yet — start exploring!
        </p>
      </div>
    );
  }

  // 3) normal UI
  return (
    <div className="w-full p-[2rem] bg-[#E9E9E9]">
      <h1 className="text-4xl font-bold">Favorites</h1>

      <div className="grid grid-cols-4 justify-items-center gap-5 mt-[2rem]">
        {favorite.map((item) => (
          <div
            key={item.id}
            className="w-full bg-white rounded-[0.3rem] flex flex-col justify-between p-4 shadow-sm"
          >
            <div className="w-full flex justify-end">
              <MdDelete
                className="text-3xl cursor-pointer hover:text-red-600"
                onClick={() => favouriteToggle(item)}
              />
            </div>

            <div className="relative w-[50%] aspect-square mx-auto">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-contain"
                unoptimized
              />
            </div>

            <div className="w-full h-12 flex items-center justify-center px-1">
              <span className="text-center font-medium line-clamp-2">
                {item.title}
              </span>
            </div>

            <div className="w-full flex justify-center px-1 mt-2 text-lg">
              <span>${item.price}</span>
            </div>

            <button
              className="w-full p-3 text-white bg-[#1E1E1E] mt-2 rounded"
              onClick={() => addToCart(item)}
            >
              Add To Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
