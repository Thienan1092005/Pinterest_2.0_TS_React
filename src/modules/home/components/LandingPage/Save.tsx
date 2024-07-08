import SortContent from "@/components/customUi/SortContent";
import ImgHaveTextIner from "../ImgHaveTextIner";

export default function Save() {
  const imgs: string[] = [
    "https://s.pinimg.com/webapp/future-home1-b8bc36e8.png",
    "https://s.pinimg.com/webapp/future-home2-31c812cc.png",
    "https://s.pinimg.com/webapp/future-home3-037e8d49.png",
  ];
  return (
    <div className="w-full h-screen bg-[#dafff6] flex overflow-hidden  ">
      <div className="w-1/2 flex justify-center items-center ">
        <SortContent
          title="Lưu ý tưởng bạn thích"
          content="Thu thập nội dung bạn yêu thích để bạn có thể quay lại xem sau."
          titleColor="text-[#006b6c]"
          contentColor="text-[#006b6c]"
        />
      </div>
      <div className="flex h-full mt-[150px] flex-1 justify-center items-cente ">
        <div className=" flex justify-between gap-x-[50px] ">
          <div className=" ">
            <ImgHaveTextIner
              className=" left-0 top-0"
              img="https://s.pinimg.com/webapp/future-home-vibes-adb19e98.png"
              content=" Dương xỉ trang trí"
            >
              <div className="flex gap-x-3 p-2 ">
                {imgs.map((img, index) => (
                  <img
                    className="w-[90px] h-[130px] object-cover "
                    key={index}
                    src={img}
                    alt=""
                  />
                ))}
              </div>
            </ImgHaveTextIner>
            <ImgHaveTextIner
              className="!h-[235px] !w-[223px]   ml-auto mt-[30px]  "
              content="Đồ uống phong cách"
              img="https://s.pinimg.com/webapp/serve-my-drinks-4de83489.png"
              fontSize="30"
            />
          </div>
          <div>
            <ImgHaveTextIner
              className="!w-[223px] !h-[235px]"
              content="phòng ngủ phong cách Scaniviadai"
              fontSize="28"
              img="https://s.pinimg.com/webapp/scandinavian-bedroom-696dfba5.png"
            />
            <ImgHaveTextIner
              className="!w-[165px] !h-[173px]  mt-[30px] "
              img="https://s.pinimg.com/webapp/deck-of-dreams-205a139e.png "
              content="Sân hiên trong mơ"
              fontSize="28"
            />
            <ImgHaveTextIner
              className="!w-[223px] !h-[235px]  mt-[30px] "
              img="https://s.pinimg.com/webapp/bathroom-upgrade-02599fd4.png"
              content="nâng cấp phòng tắm"
              fontSize="28"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
