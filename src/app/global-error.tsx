"use client";

import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="flex flex-col items-center justify-center h-screen gap-6">
          <h1 className="text-3xl font-bold">Something went wrong!</h1>
          <p className="text-gray-500">{error.message}</p>
          <div className="flex gap-4">
            <button
              onClick={() => reset()}
              className="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800"
            >
              Retry
            </button>
            <Link
              href="/"
              className="border border-black px-6 py-3 rounded-full hover:bg-gray-100"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
