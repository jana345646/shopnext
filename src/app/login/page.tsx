import Image from "next/image";
import { FaEye } from "react-icons/fa";

function LogIn() {
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

        <form className="flex flex-col gap-[2rem]">
          <div className="flex flex-col gap-1 pl-[3rem]">
            <label className="text-lg">Username</label>
            <input
              type="text"
              className="border-b border-gray-500 outline-none w-[80%]"
            />
          </div>

          <div className="flex flex-col gap-1 pl-[3rem]">
            <label className="text-lg">Password</label>
            <div className="relative w-[80%]">
              <input
                type="password"
                className="border-b border-gray-500 outline-none w-full pr-8"
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
