"use client";

import ProtectedRoute from "@/components/ProtectedRoute";

export default function CartPage() {
  return (
    <ProtectedRoute>
      <div className="p-8">
        <h1 className="text-3xl font-bold">Cart</h1>
      </div>
    </ProtectedRoute>
  );
}
