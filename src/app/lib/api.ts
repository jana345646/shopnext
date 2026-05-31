export async function fetchProducts() {
  try {
    const res = await fetch("https://fakestoreapi.com/products");

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
    const res = await fetch("https://fakestoreapi.com/products/categories");

    if (!res.ok) return [];

    const data = await res.json();

    console.log("f1");

    return data;
  } catch (error) {
    console.error("Categories Fetch Error:", error);

    return [];
  }
}

export async function fetchProduct(id: string) {
  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`);

    if (!res.ok) throw new Error("Failed to fetch product");

    const data: Product = await res.json();

    console.log("product fetched");

    return data;
  } catch (err) {
    console.error("error fetching product", err);
    return null;
  }
}
