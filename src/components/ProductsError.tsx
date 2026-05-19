"use client";

type Props = {
  onRetry: () => void;
};

export default function ProductsError({ onRetry }: Props) {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center text-bold my-8 gap-4 ">
      <p>Something went wrong</p>

      <button
        className="text-white  bg-[#1E1E1E] p-3 w-[20%] rounded-[0.3rem]"
        onClick={onRetry}
      >
        Retry
      </button>
    </div>
  );
}
