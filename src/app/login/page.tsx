"use client";

import Image from "next/image";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from "@/context/AuthContext";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { FaSpinner } from "react-icons/fa";

export default function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const authData = useContext(AuthContext);
  const router = useRouter();

  if (!authData) return null;

  const { login } = authData;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let hasError = false;

    setEmailError("");
    setPasswordError("");

    if (!email) {
      setEmailError("Email is required");
      hasError = true;
    }

    if (!password) {
      setPasswordError("Password is required");
      hasError = true;
    }

    if (hasError) return;

    try {
      setLoading(true);
      setError("");

      await login(email, password);

      const searchParams = new URLSearchParams(window.location.search);
      const next = searchParams.get("next");

      router.push(next || "/");
    } catch {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex ">
      <div className="relative w-[60%] h-[85vh]">
        <Image
          src="/shoppingyellow2.png"
          alt="shopping image"
          fill
          className="object-contain"
          unoptimized
        />
      </div>

      <div className="w-[40%] flex flex-col gap-[2rem] justify-center">
        <h1 className="text-5xl text-center">User Login</h1>

        <form
          className="flex flex-col gap-[2rem]"
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <div className="flex flex-col gap-1 pl-[3rem]">
            <label className="text-lg">Email</label>
            <input
              type="text"
              autoComplete="none"
              className={`border-b outline-none w-[80%] transition-colors ${
                emailError ? "border-red-500" : "border-gray-500"
              }`}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError("");
              }}
            />

            {emailError && (
              <p className="text-red-500 text-sm mt-1 w-[80%] ">{emailError}</p>
            )}
          </div>

          <div className="flex flex-col gap-1 pl-[3rem]">
            <label className="text-lg">Password</label>

            <div className="relative w-[80%]">
              <input
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                className={`border-b outline-none w-full pr-8 transition-colors ${
                  passwordError ? "border-red-500" : "border-gray-500"
                }`}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError("");
                }}
              />

              {passwordError && (
                <p className="text-red-500 text-sm mt-1">{passwordError}</p>
              )}

              {showPassword ? (
                <FaEyeSlash
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute right-0 top-[35%] -translate-y-1/2 cursor-pointer text-lg"
                />
              ) : (
                <FaEye
                  onClick={() => setShowPassword(true)}
                  className="absolute right-0 top-[35%] -translate-y-1/2 cursor-pointer text-lg"
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
                "Login"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
