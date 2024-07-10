import footerbg from "../footerbg.png";
import { GoChevronUp } from "react-icons/go";
import SignupForm from "@/components/formSystem/SignupForm";

export default function Botton() {
  return (
    <div className="w-full relative flex  h-screen">
      <img
        className="w-screen z-[-1] h-screen absolute"
        src={footerbg}
        alt="Nền ảnh của phần cuối"
      />
      {/* overlay */}
      <div className="absolute z-[-1] top-0 left-0 w-full h-full bg-black/60"></div>

      <div className="w-1/2 z-20 h-full flex justify-center items-center">
        <h1 className="text-white font-sf-bold max-w-[400px] text-[65px]">
          Đăng ký để nhận thêm ý tưởng
        </h1>
      </div>
      <button
        onClick={() => {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }}
        className=" w-[50px] h-[50px]   text-3xl  cursor-pointer mt-[80px]  rounded-full  text-white bg-[#9c0343]"
      >
        <GoChevronUp />
      </button>
      <div className="w-1/2 flex  justify-center items-center h-full">
        <SignupForm />
      </div>
    </div>
  );
}
