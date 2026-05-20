"use client";
import { useContext } from "react";
import { ProductsContext } from "@/context/ProductsContext";

function Error() {
  const { error, retryFetch } = useContext(ProductsContext);
  if (error) {
    return (
      <div>
        <h2>Failed to load products</h2>
        <p>{error}</p>

        <button onClick={retryFetch}>Retry</button>
      </div>
    );
  }
}
