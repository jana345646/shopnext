"use client";

import { useContext, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaEye, FaEyeSlash, FaSpinner } from "react-icons/fa";

export default function Register() {
  const authData = useContext(AuthContext);
  const router = useRouter();

  if (!authData) return null;

  const { register } = authData;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      await register(email, password);

      router.replace("/");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex">
      <div className="w-[40%] flex flex-col gap-[2rem] justify-center">
        <h1 className="text-5xl text-center">Create Account</h1>

        <form className="flex flex-col gap-[2rem]" onSubmit={handleRegister}>
          <div className="flex flex-col gap-1 pl-[3rem]">
            <label className="text-lg">Email</label>

            <input
              type="email"
              autoComplete="off"
              className="border-b border-gray-500 outline-none w-[80%]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1 pl-[3rem]">
            <label className="text-lg">Password</label>

            <div className="relative w-[80%]">
              <input
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                className="border-b border-gray-500 outline-none w-full pr-8"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              {showPassword ? (
                <FaEyeSlash
                  onClick={() => setShowPassword(false)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 cursor-pointer"
                />
              ) : (
                <FaEye
                  onClick={() => setShowPassword(true)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 cursor-pointer"
                />
              )}
            </div>
          </div>

          {error && <p className="text-red-500 text-center">{error}</p>}

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className="bg-[#1E1E1E] text-white p-2 text-lg font-bold w-[50%] rounded-[2rem] mt-5 disabled:opacity-70 flex justify-center items-center"
            >
              {loading ? (
                <FaSpinner className="animate-spin text-xl" />
              ) : (
                "Register"
              )}
            </button>
          </div>
        </form>
      </div>

      <div className="relative w-[60%] h-[85vh]">
        <Image
          src="/shoppingyellow2.png"
          alt="shopping image"
          fill
          className="object-contain"
          unoptimized
        />
      </div>
    </div>
  );
}
