import SortContent from "@/components/customUi/SortContent";
import { FaSearch } from "react-icons/fa";

export default function Search() {
  return (
    <div className="w-full items-center h-screen  bg-[#fffd92] flex">
      <div className="w-1/2 cursor-pointer flex justify-center items-center">
        <div className=" relative w-[298px] h-[456px] rounded-xl">
          <img
            className=" absolute w-full h-full top-0 left-0 z-[2] object-cover"
            src="https://s.pinimg.com/webapp/center-2d76a691.png"
            alt=""
          />
          <img
            className=" absolute h-[50%] top-[20%] left-0 -translate-x-3/4 z-[1]  object-cover"
            src="https://s.pinimg.com/webapp/left-ccce7532.png"
            alt=""
          />
          <img
            className="absolute h-[50%] top-0 right-0 translate-x-1/2 -translate-y-1/2 object-cover"
            src="https://s.pinimg.com/webapp/topRight-6902088a.png"
            alt=""
          />
          <img
            className="absolute h-[50%] bottom-0 right-0 translate-x-1/2 translate-y-1/4 object-cover"
            src="https://s.pinimg.com/webapp/right-2bd1edfc.png"
            alt=""
          />
          <div className="w-full absolute pr-2 z-[5] py-[20px] top-1/2 left-[-25px] -translate-y-1/2 bg-white rounded-[100px] flex justify-between gap-x-3 ">
            <FaSearch className=" absolute top-1/2 text-[30px] -translate-y-1/2 " />
            <h1 className="text-black tracking-wider	  ml-auto text-center max-w-[250px]  font-sf-bold text-[20px]">
              bữa tối với món gà dễ làm
            </h1>
          </div>
        </div>
      </div>
      <div className="w-1/2">
        <SortContent
          content={`Bạn muốn thử điều gì tiếp theo? Hãy nghĩ về ý tưởng bạn yêu thích—như "bữa tối với món gà dễ làm"—và xem bạn tìm thấy gì.`}
          title="Tìm kiếm ý tưởng"
          titleColor=" text-red-500"
          contentColor="text-gray-700"
        ></SortContent>
      </div>
    </div>
  );
}
