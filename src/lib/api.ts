export async function fetchProducts() {
  try {
    const res = await fetch("https://fakestoreapi.com/products", {
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed to fetch products");

    return await res.json();
  } catch (err) {
    console.error("error fetching products:", err);
    throw new Error("Something went wrong");
  }
}
export async function fetchCategories() {
  try {
    const res = await fetch("https://fakestoreapi.com/products/categories", {
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed to fetch categories");

    return await res.json();
  } catch (error) {
    console.error("Categories Fetch Error:", error);
    throw new Error("Something went wrong");
  }
}

export async function fetchProduct(id: string | number) {
  const productId = Number(id);

  if (isNaN(productId)) {
    throw new Error("Invalid product id");
  }

  try {
    const res = await fetch(`https://fakestoreapi.com/products/${productId}`, {
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Product not found");

    return await res.json();
  } catch (err) {
    console.error("fetch failed:", err);
    throw new Error("Something went wrong");
  }
}
