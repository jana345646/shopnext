export default function Footer() {
  return (
    <>
      <div className="w-full bg-[#1E1E1E] grid grid-cols-2 text-white px-6 py-10 gap-8 md:grid-cols-4 md:gap-10">
        <div className="flex flex-col gap-3 text-sm ">
          <div>
            <p className="font-bold text-xl lg:text-2xl">
              <span className="text-yellow-500">S</span>hopNext
            </p>
            <p className="text-[0.6rem] text-white lg:text-[0.7rem]">
              ONLINE SHOPPING
            </p>
          </div>
          <p className="mt-2 lg:text-[1rem] ">
            <span className="font-bold lg:text-[1rem]">Address:</span> Lahore
            Road, Sheikhupura
          </p>
          <p className="lg:text-[1rem]">
            <span className="font-bold lg:text-[1rem]">E-mail:</span>{" "}
            ShopNext@gmail.com
          </p>
          <p className="lg:text-[1rem]">
            <span className="font-bold lg:text-[1rem]">Phone:</span> 0092 356
            3656210
          </p>
        </div>

        <div className="flex flex-col gap-3 text-sm md:text-base">
          <p className="font-bold pb-1 lg:text-xl ">Shopping and Categories</p>
          <div className="font-normal flex flex-col gap-2 text-gray-300 lg:text-lg">
            <p className="hover:text-yellow-500 cursor-pointer">
              Men’s Shopping
            </p>
            <p className="hover:text-yellow-500 cursor-pointer">
              Women’s Shopping
            </p>
            <p className="hover:text-yellow-500 cursor-pointer">Electronics</p>
            <p className="hover:text-yellow-500 cursor-pointer">Jewelery</p>
          </div>
        </div>

        <div className="flex flex-col gap-3 text-sm md:text-base">
          <p className="font-bold pb-1 lg:text-lg  lg:text-xl">Useful Links</p>
          <div className="font-normal flex flex-col gap-2 text-gray-300 lg:text-lg">
            <p className="hover:text-yellow-500 cursor-pointer">Homepage</p>
            <p className="hover:text-yellow-500 cursor-pointer">Cart</p>
            <p className="hover:text-yellow-500 cursor-pointer">Favourite</p>
          </div>
        </div>

        <div className="flex flex-col gap-3 text-sm md:text-base">
          <p className="font-bold pb-1 lg:text-xl">Help & Information</p>
          <div className="font-normal flex flex-col gap-2 text-gray-300 lg:text-lg">
            <p className="hover:text-yellow-500 cursor-pointer">Shipping</p>
            <p className="hover:text-yellow-500 cursor-pointer">Tracking Id</p>
          </div>
        </div>
      </div>
    </>
  );
}
