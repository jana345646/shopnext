function Footer() {
  return (
    <>
      <div className="w-full bg-[#1E1E1E] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 text-white px-6 py-10 md:px-12 lg:px-20 gap-8 md:gap-10">
        <div className="flex flex-col gap-3 text-sm md:text-base">
          <div>
            <p className="font-bold text-2xl">
              <span className="text-yellow-500">S</span>hopNext
            </p>
            <p className="font-normal text-[0.6rem] tracking-wider text-gray-400">
              ONLINE SHOPPING
            </p>
          </div>
          <p className="mt-2">
            <span className="font-bold">Address:</span> Lahore Road, Sheikhupura
          </p>
          <p>
            <span className="font-bold">E-mail:</span> ShopNext@gmail.com
          </p>
          <p>
            <span className="font-bold">Phone:</span> 0092 356 3656210
          </p>
        </div>

        <div className="flex flex-col gap-3 text-sm md:text-base">
          <p className="font-bold border-b border-gray-700 pb-1 lg:border-none">
            Shopping and Categories
          </p>
          <div className="font-normal flex flex-col gap-2 text-gray-300">
            <p className="hover:text-yellow-500 cursor-pointer">
              Men’s Shopping
            </p>
            <p className="hover:text-yellow-500 cursor-pointer">
              Women’s Shopping
            </p>
            <p className="hover:text-yellow-500 cursor-pointer">
              Kids Shopping
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 text-sm md:text-base">
          <p className="font-bold border-b border-gray-700 pb-1 lg:border-none">
            Useful Links
          </p>
          <div className="font-normal flex flex-col gap-2 text-gray-300">
            <p className="hover:text-yellow-500 cursor-pointer">Homepage</p>
            <p className="hover:text-yellow-500 cursor-pointer">About Us</p>
            <p className="hover:text-yellow-500 cursor-pointer">Contact Us</p>
          </div>
        </div>

        <div className="flex flex-col gap-3 text-sm md:text-base">
          <p className="font-bold border-b border-gray-700 pb-1 lg:border-none">
            Help & Information
          </p>
          <div className="font-normal flex flex-col gap-2 text-gray-300">
            <p className="hover:text-yellow-500 cursor-pointer">Shipping</p>
            <p className="hover:text-yellow-500 cursor-pointer">Tracking Id</p>
          </div>
        </div>
      </div>
    </>
  );
}
export default Footer;
