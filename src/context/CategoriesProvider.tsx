"use client";

import { useState, useEffect } from "react";
import { CategoryContext } from "./CategoriesContext";
import { Category } from "@/types";
import { fetchCategories } from "@/lib/api";
export default function CategoriesProvider({
  children,
  initialCategories = [],
}: {
  children: React.ReactNode;
  initialCategories: Category[];
}) {
  // 1️⃣ حطينا الـ initialCategories كـ قيمة مبدئية للـ State علطول عشان لو جاية من السيرفر جاهزة
  const [category, SetCategory] = useState<Category[]>(initialCategories);
  const [error, SetError] = useState<string | null>(null);

  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await fetchCategories();
        SetCategory(data);
      } catch (err) {
        console.error(err);
        SetError("failed");
      }
    }

    // 2️⃣ لو مفيش data جاية من برا أصلاً، روح هاتها من الـ API
    if (initialCategories.length === 0) {
      loadCategories();
    }
  }, []); // 👈 خلّيها فاضية [] عشان تشتغل مرة واحدة بس في العمر وتمنع الـ Loop النهائياً!

  return (
    <CategoryContext.Provider
      value={{ category, SetCategory, error, SetError }}
    >
      {children}
    </CategoryContext.Provider>
  );
}
