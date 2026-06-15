"use client";

import { useContext } from "react";
import { FavoriteContext } from "@/context/FavoriteContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Product } from "@/types";

function FavoriteButton({ product }: { product: Product }) {
  const favoriteData = useContext(FavoriteContext);

  if (!favoriteData) return null;

  const { favorite, dispatch } = favoriteData;

  const isFavorite = favorite.some((item) => item.id === product.id); // for ui , but in reducer is for the logic

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    dispatch({
      type: "TOGGLE_FAVOURITE",
      payload: product,
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
