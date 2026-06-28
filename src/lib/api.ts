export async function fetchProducts() {
  // async as this function returns a promise (promise that the data will be returned soon) so it take time so  we use async to can use await

  const res = await fetch("https://fakestoreapi.com/products"); // this returns a response objects (res.statues , ..)

  if (!res.ok) throw new Error("Failed to fetch products"); // if the statuse failed for ana reason we make a manuall erro that will stop the execuation and go to the catch block , throw(stops the code here and returns it to the catch) , Error (is a built in class in js holds the error message) , new (to create an object from the class)

  return res.json(); //converts data from json to js object
}

export async function fetchCategories() {
  const res = await fetch("https://fakestoreapi.com/products/categories");

  if (!res.ok) throw new Error("Failed to fetch categories");

  return res.json();
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
