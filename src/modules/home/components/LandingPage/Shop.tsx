import SortContent from "@/components/customUi/SortContent";

export default function Shop() {
  return (
    <div className=" w-full h-screen flex bg-[#ffe2eb] ">
      <div className="w-1/2 relative bg-[url(https://s.pinimg.com/webapp/shop-de8ddf10.png)] pb-[15px] bg-cover">
        <div className="  absolute bottom-[100px] left-[100px]  w-[215px] h-[383px] ">
          <img
            className=" rounded-[25px] absolute w-full h-full top-0 left-0"
            src="https://s.pinimg.com/webapp/creator-pin-img-3bed5463.png"
            alt=""
          />
          <img
            className=" absolute w-[80px] h-[80px] object-cover  bottom-0 left-0 -translate-x-1/2 translate-y-[30%]"
            src="https://s.pinimg.com/webapp/creator-avatar-262dfeba.png"
            alt=""
          />
          <div className=" text-white absolute   bottom-0 pt-[70px] w-full translate-y-1/2    ">
            <h1 className="text-center font-sf-bold ">Scout the City</h1>
            <p className=" font-sf-light max-w-[100px] ">
              56.7 nghìn người theo dõi
            </p>
          </div>
        </div>
      </div>
      <div className="flex-1 flex justify-center items-center">
        <SortContent
          title="Xem, làm, thử, thực hiện"
          themeColor="#c32f00"
          lineWhidth="100px"
          content="Điều tuyệt nhất trên Pinterest là khám phá những nội dung và ý tưởng mới từ mọi người khắp thế giới."
        />
      </div>
    </div>
  );
}
