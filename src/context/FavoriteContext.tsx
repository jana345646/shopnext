import { createContext } from "react";
import { Product } from "@/types";

// 1. تظبيط الـ Actions بحيث تقبل الـ Toggle والـ Clear
import { Product } from "@/types";
import { FavoriteAction } from "./FavoriteContext"; // تأكد من مسار الـ Context بتاعك

export function favoriteReducer(
  state: Product[],
  action: FavoriteAction,
): Product[] {
  switch (action.type) {
    case "TOGGLE_FAVOURITE":
      // بنشوف هل المنتج موجود أصلاً في المفضلة ولا لأ عن طريق الـ id
      const exists = state.find((item) => item.id === action.payload.id);

      if (exists) {
        // لو موجود: بنشيله (بنعيد المصفوفة من غير المنتج ده)
        return state.filter((item) => item.id !== action.payload.id);
      }

      // لو مش موجود: بنضيفه على المنتجات القديمة
      return [...state, action.payload];

    case "CLEAR_FAVOURITES":
      // تصفير المفضلة تماماً عند الخروج
      return [];

    default:
      return state;
  }
}

export type FavoriteContextType = {
  favorite: Product[];
  dispatch: React.Dispatch<FavoriteAction>;
};

export const FavoriteContext = createContext<FavoriteContextType | null>(null);
