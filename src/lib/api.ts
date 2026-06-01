export async function fetchProducts() {
  try {
    const res = await fetch("https://fakestoreapi.com/products", {
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed to fetch products");

    const data: Product[] = await res.json();

    return data;
  } catch (err) {
    console.error("error fetching product:", err);
    return [];
  }
}

export async function fetchCategories() {
  try {
    const res = await fetch("https://fakestoreapi.com/products/categories", {
      cache: "no-store",
    });

    if (!res.ok) return [];

    const data = await res.json();

    return data;
  } catch (error) {
    console.error("Categories Fetch Error:", error);

    return [];
  }
}

export async function fetchProduct(id: string | number) {
  const productId = Number(id);
  if (isNaN(productId)) return null;

  try {
    const res = await fetch(`https://fakestoreapi.com/products/${productId}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;

    const data = await res.json();
    return data ?? null;
  } catch (err: any) {
    console.error("fetch failed:", err.message);
    return null;
  }
}
