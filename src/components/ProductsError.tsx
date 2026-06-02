"use client";

import Link from "next/link";

type Props = {
  onRetry: () => void;
};

export default function ProductsError({ onRetry }: Props) {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center font-bold my-8 gap-4 ">
      <p>Something went wrong</p>

      <button
        className="text-white bg-[#1E1E1E] p-3 w-[20%] rounded-[0.3rem]"
        onClick={onRetry}
      >
        Retry
      </button>

      <Link
        href="/"
        className="text-sm text-gray-500 underline hover:text-black font-normal"
      >
        Back to Home
      </Link>
    </div>
  );
}
