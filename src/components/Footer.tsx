function Footer() {
  return (
    <>
      <div className="w-full h-[15rem] bg-[#1E1E1E] grid grid-cols-4 text-white ">
        <div className="flex flex-col  gap-[1rem] text-[1rem] pt-[2.6rem] pl-[5rem]">
          <div>
            <p className="font-bold text-2xl">
              <span className="text-yellow-500">S</span>hopNext
            </p>
            <p className="font-normal  text-[0.6rem]">ONLINE SHOPPING</p>
          </div>
          <p>
            <span className=" font-bold">Address:</span> Lahore Road,
            Sheikhupura
          </p>
          <p>
            <span className=" font-bold">E-mail:</span> ShopNext@gmail.com
          </p>
          <p>
            <span className=" font-bold">Phone:</span> 0092 356 3656210
          </p>
        </div>
        <div className="flex flex-col  gap-[1rem] text-[1rem] pt-[1.5rem] pl-[5rem]">
          <p className="font-bold">Shopping and Categories</p>
          <div className="font-normal flex flex-col gap-[1rem]">
            <p className="font-normal">Men’s Shopping</p>
            <p className="font-normal">Women’s Shopping</p>
            <p className="font-normal">Kids Shopping</p>
          </div>
        </div>
        <div className="flex flex-col  gap-[1rem] text-[1rem] pt-[1.5rem] pl-[5rem] text-white">
          <p className="font-bold">Useful Links</p>
          <div className="font-normal flex flex-col gap-[1rem]">
            <p>Homepage</p>
            <p>About Us</p>
            <p>Contact Us</p>
          </div>
        </div>
        <div className="flex flex-col  gap-[1rem] text-[1rem] pt-[1.5rem] pl-[5rem] text-white">
          <p className="font-bold">Help & Information</p>
          <div className="font-normal flex flex-col gap-[1rem]">
            <p>Shipping</p>
            <p>Tracking Id</p>
          </div>
        </div>
      </div>
    </>
  );
}
export default Footer;
