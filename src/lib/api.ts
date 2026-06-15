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

export async function fetchToken(username: string, password: string) {
  // password string because input always return the value as string

  try {
    const res = await fetch("https://fakestoreapi.com/auth/login", {
      method: "POST",
      // in headrs we put additional information about the data we are sending
      headers: {
        "Content-Type": "application/json", //contect type this is the type of the data we sent it , json(it's a way to write the data in a form the broswer and the server can uderstand it ({"key":value}, ....))
      },
      body: JSON.stringify({
        // body contains the actual data that we will send in the request , json.stringfy to convert the object into string

        username,
        password,
      }),
    });

    const text = await res.text(); // to save the server response , .text to convert the respone into a string as (it could return a token or an error message that must be a string) , so we make it string to avoid crashing

    try {
      return {
        status: res.status,
        data: JSON.parse(text), //to convert string to an object
      };
    } catch {
      return {
        status: res.status,
        data: { error: text },
      };
    }
  } catch (err) {
    return {
      networkError: true,
    };
  }
}
