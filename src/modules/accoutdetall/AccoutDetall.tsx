import AvatarOrName from "@/components/customUi/AvatarOrName";
import RoundedButton from "@/components/customUi/RoundedButton";
import { selectAuth } from "@/redux/slices/authSlice";
import { Tab, Tabs } from "@nextui-org/react";
import { FaPinterest } from "react-icons/fa";
import { useSelector } from "react-redux";
import Saved from "./Saved";
import Created from "./Created";

export default function AccoutDetall() {
  const { currentUser } = useSelector(selectAuth);
  if (!currentUser) return;
  const { avatar, full_name, username } = currentUser;
  return (
    <div className=" px-10">
      <AvatarOrName
        src={avatar}
        name={full_name}
        className=" w-[120px] h-[120px] text-[50px] font-sf-bold mx-auto rounded-full object-cover"
      />
      <div className=" mx-auto mt-2 text-center">
        <h1 className=" text-[40px] font-sf-bold">{full_name}</h1>
        <div className=" flex gap-x-2 justify-center items-center ">
          <FaPinterest />
          <h1>{username}</h1>
        </div>
      </div>
      <RoundedButton className=" !mx-auto !mt-5 !text-black !bg-gray-200">
        Chỉnh sửa hồ sơ
      </RoundedButton>
      <div className=" flex w-full flex-col">
        <Tabs
          className=" mx-auto mt-5"
          classNames={{
            cursor: "w-full absolute botton-0  h-1 bg-primary-red-color",
            tab: "font-sf-bold py-2  text-[16px]",
          }}
          variant="underlined"
          aria-label="Options"
        >
          <Tab key="photo" title="Đã tạo ">
            <Created />
          </Tab>
          <Tab key="test" title="Đã lưu">
            <Saved />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}
