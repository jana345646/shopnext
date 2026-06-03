"use client";

import Image from "next/image";
import { FaEye } from "react-icons/fa";
import { LoginContext } from "@/context/LoginContext";
import { useContext } from "react";
function LogIn() {
  const loginData = useContext(LoginContext);

  if (!loginData) return null;

  const { setUsername, setPassword, username, password, login } = loginData;

  const handleSubmit = async (e: React.FormEvent) => {
    // e is a variable that contains data about the form
    e.preventDefault(); //it prevents the form to do it's default action (reload the page when the form is submitted)

    console.log("username:", username);
    console.log("password:", password);

    const data = await login();

    console.log(data); //it displays the result (token , error)
  };

  return (
    <div className="w-full flex h-[85vh]">
      <div className="relative w-[60%] h-full">
        <Image
          src="/shopping.svg"
          alt="shopping image"
          fill
          className="object-contain"
          unoptimized
        />
      </div>

      <div className=" w-[40%] flex flex-col gap-[2rem] justify-center rounded-[3rem] my-3">
        <h1 className="text-[3rem] text-center">User Login</h1>

        <form className="flex flex-col gap-[2rem] " onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1 pl-[3rem]">
            <label className="text-lg">Username</label>
            <input
              type="text"
              className="border-b border-gray-500 outline-none w-[80%]"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1 pl-[3rem]">
            <label className="text-lg">Password</label>
            <div className="relative w-[80%]">
              <input
                type="password"
                className="border-b border-gray-500 outline-none w-full pr-8"
                onChange={(e) => setPassword(e.target.value)}
              />

              <FaEye className="absolute right-0 top-[35%] -translate-y-1/2 cursor-pointer text-lg" />
            </div>
          </div>

          <button
            type="submit"
            className=" bg-[#1E1E1E] text-white p-2 text-lg font-bold w-[50%] rounded-[2rem] place-self-center mt-5"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
export default LogIn;
