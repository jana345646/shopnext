import { CartContext } from "@/context/CartContext";
import { useContext } from "react";
import toast from "react-hot-toast";

export default function SummarySectionCart() {
  const cartData = useContext(CartContext);

  if (!cartData) return null;

  const { cart, dispatch, setIsCartOpen } = cartData;

  const subTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const shipping = 5;

  const Total = subTotal + shipping;

  function handleCheckout() {
    toast.success("Order placed successfully!");

    dispatch({
      type: "CLEAR_CART",
    });

    setIsCartOpen(false);
  }

  return (
    <div className="flex justify-center">
      <div className="w-full border-2 border-gray-300 rounded-[0.5rem] flex flex-col gap-5 mt-5 pb-8 ">
        <h1 className="pt-8 px-5 text-2xl">Order Summary</h1>
        <div className="flex justify-between px-[3.5rem] text-xl">
          <p>Subtotal</p>
          <span>${subTotal}</span>
        </div>

        <div className="flex justify-between pl-[3.5rem] pr-[6rem] text-xl">
          <p>Shipping</p>
          <span>${shipping}</span>
        </div>

        <div className="flex justify-between pl-[3.5rem] pr-[3.5rem] text-xl">
          <p>Total</p>
          <span>${Total}</span>
        </div>

        <div className="flex justify-center">
          <button
            className="w-[95%] rounded-[0.3rem] bg-[#1E1E1E] p-3 text-white font-bold cursor-pointer mt-4"
            onClick={handleCheckout}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
