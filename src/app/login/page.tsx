"use client";

import Image from "next/image";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import { FaSpinner } from "react-icons/fa";

export default function LogIn() {
  const authData = useContext(AuthContext);
  const router = useRouter();

  if (!authData) return null;

  const {
    login,
    formUsername,
    setFormUsername,
    Password,
    setPassword,
    error,
    setError,
    usernameError,
    setUsernameError,
    passwordError,
    setPasswordError,
    showPassword,
    setShowPassword,
    loading,
    setLoading,
  } = authData;

  const handleSubmit = async (e: React.FormEvent) => {
    // e is an event object that holds information about the event
    e.preventDefault(); // it prevents the page reload after the submit

    let hasError = false;

    setUsernameError("");
    setPasswordError("");

    if (!formUsername) {
      setUsernameError("Username is required");
      hasError = true;
    }

    if (!Password) {
      setPasswordError("Password is required");
      hasError = true;
    } else if (Password.length < 4) {
      setPasswordError("Password must be at least 4 characters");
      hasError = true;
    }

    if (hasError) return;

    setLoading(true);

    const result = await login(formUsername, Password);

    setLoading(false);

    if (result.status === 401) {
      // staus was sent automatically by the server
      setError("Invalid username or password.");
      return;
    }

    if (result.networkError) {
      //variable we declared it
      setError("Login service unavailable. Please try again.");
      return;
    }

    // FakeStore API does NOT provide token expiration.
    // This means the token is always valid unless manually removed

    if (result.data?.token) {
      const searchParams = new URLSearchParams(window.location.search); // this is a class in js by it we can take the part of the query(after ?) from the url
      const next = searchParams.get("next"); // get is a method inside URLSearchParams to get a specific part from the url

      router.push(next || "/"); // it will navigate to the next if it exists or to the home page
    }
  };

  // we used relative to can use fill (so to make the div to be the reference of the image "to be filled according to it")
  return (
    <div className="w-full flex ">
      <div className="relative w-[60%] h-[85vh]">
        <Image
          src="/shoppingyellow2.png"
          alt="shopping image"
          fill
          className="object-contain" // don't cut the image
          unoptimized // it stops the Image optimization
        />
      </div>

      <div className="w-[40%] flex flex-col gap-[2rem] justify-center">
        <h1 className="text-5xl text-center">User Login</h1>

        <form className="flex flex-col gap-[2rem]" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1 pl-[3rem]">
            <label className="text-lg">Username</label>

            <input
              type="text"
              className={`border-b outline-none w-[80%] transition-colors ${
                usernameError ? "border-red-500" : "border-gray-500"
              }`}
              value={formUsername}
              onChange={(e) => {
                setFormUsername(e.target.value);
                setUsernameError("");
              }}
            />

            {usernameError && (
              <p className="text-red-500 text-sm mt-1 w-[80%] ">
                {usernameError}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1 pl-[3rem]">
            <label className="text-lg">Password</label>

            <div className="relative w-[80%]">
              <input
                type={showPassword ? "text" : "password"}
                className={`border-b outline-none w-full pr-8 transition-colors ${
                  passwordError ? "border-red-500" : "border-gray-500"
                }`}
                value={Password}
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
                  onClick={() => setShowPassword(false)}
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
