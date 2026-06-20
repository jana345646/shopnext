"use client";
import { useReducer, useEffect, useState } from "react";
import { CartContext } from "./CartContext";
import { cartReducer } from "./CartContext";

//we use this function as in the first render for the component the data will be null even if there is data saved in the local storage , so due to that we use this function that will be done before the render
//so we use it to avoid to return false data befor it gets the data after the render

const getInitialCart = () => {
  if (typeof window === "undefined") return []; //type of window (undefined = we are on server , object = we are on browser)

  try {
    const stored = localStorage.getItem("shopnext_cart");
    return stored ? JSON.parse(stored) : []; //parse converts the string to an object or an array
  } catch {
    return [];
  }
};

function isStorageAvailable() {
  try {
    localStorage.setItem("test", "1");
    localStorage.removeItem("test");
    return true;
  } catch {
    return false;
  }
}

//flow: react renders the component , so first it will see the function (getinitial cart) so it runs it then according to it it renders the ui

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, dispatch] = useReducer(cartReducer, undefined, getInitialCart);
  // cart(current cart) , dispatch(the function that will change in the state "cart") , undefined(initial value for the sate , so it means don't use this state , wait unit the function  is done and from it get the initial value)

  const [mounted, setMounted] = useState(false);
  // we make this state as the component runs on the server and on the client (client cart is 2 , server cart is 0 "hydration error") , so we make it false to be 0 first then useeffect to be 2

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [storageAvailable, setStorageAvailable] = useState(false);

  // save cart to localStorage (ONLY HERE - not in render)
  useEffect(() => {
    if (cart.length === 0) {
      localStorage.removeItem("shopnext_cart");
      return;
    }

    localStorage.setItem("shopnext_cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setStorageAvailable(isStorageAvailable());
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        dispatch,
        mounted,
        setMounted,
        isCartOpen,
        setIsCartOpen,
        storageAvailable,
        setStorageAvailable,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
