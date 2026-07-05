"use client";

import { useContext } from "react";
import { FavoriteContext } from "@/context/FavoriteContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { FavoriteProduct } from "@/types";

function FavoriteButton({ product }: { product: FavoriteProduct }) {
  const favoriteData = useContext(FavoriteContext);

  if (!favoriteData) return null;

  const { favorite, dispatch } = favoriteData;

  const isFavorite = favorite.some((item) => item.id === product.id); // for ui , but in reducer is for the logic

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    dispatch({
      type: "TOGGLE_FAVOURITE",
      payload: {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
      },
    });
  };
  return isFavorite ? (
    <FaHeart
      className="text-2xl text-red-600 cursor-pointer"
      onClick={handleClick}
    />
  ) : (
    <FaRegHeart
      className="text-2xl text-red-600 cursor-pointer"
      onClick={handleClick}
    />
  );
}

export default FavoriteButton;
