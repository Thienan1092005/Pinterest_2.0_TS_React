import { FaCheckCircle, FaPinterest } from "react-icons/fa";
import AvatarOrName from "./customUi/AvatarOrName";
import { useSelector } from "react-redux";
import { selectAuth } from "@/redux/slices/authSlice";
import { MdOutlineFileUpload } from "react-icons/md";
import FullRondedBtn from "./customUi/FullRondedBtn";
import { Button, Modal, ModalContent, useDisclosure } from "@nextui-org/react";
import { UserInfomationType } from "@/apis/interfaces";
interface IProps {
  data: UserInfomationType;
}
export default function UserCard({ data }: IProps) {
  const { currentUser } = useSelector(selectAuth);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  console.log("id is" + data?.id);
  return (
    <div className=" text-center w-[35%] mx-auto">
      <div className=" relative min-h-[100px] w-full mx-auto pt-4  ">
        <img
          className=" w-full object-cover rounded-[25px]"
          src="https://i.pinimg.com/1200x/c1/0c/a2/c10ca20f6bfd96ec899114c9d97df2a8.jpg"
          alt=""
        />
        <AvatarOrName
          src={data.avatar || ""}
          name={data?.full_name}
          className="w-[120px] text-4xl font-sf-bold left-1/2 -translate-x-1/2 h-[120px] absolute bottom-0 translate-y-1/2 rounded-full "
        />
      </div>
      <div className=" font-sf-regular mt-[80px] text-[16px]">
        <div className="  flex gap-x-4  justify-center items-center">
          <h1 className="  font-sf-bold text-[40px]">{data.full_name}</h1>
          {data.id == 13 && (
            <FaCheckCircle className=" text-blue-400 text-[35px] " />
          )}
        </div>
        <p>
          {data.id == 13
            ? "❤️ Admin Yukiterest 2.0 ❤️"
            : `      Warning ! Copyright prohibited Sale and downloading from other sites
          is prohibited. These images are protected by copyright`}
        </p>
        <div className=" flex mt-4 gap-x-2 justify-center items-center ">
          <FaPinterest />
          <h1>{data?.username}</h1>
        </div>
      </div>
      {data && (
        <div>
          {data?.id !== currentUser?.id ? (
            <div className=" flex mx-auto mt-5 justify-center  gap-x-5 items-center  w-[50%]">
              <FullRondedBtn>
                <MdOutlineFileUpload />
              </FullRondedBtn>
              <Button className=" bg-primary-red-color rounded-[999px] text-white  font-sf-regular">
                Theo dõi
              </Button>
              <FullRondedBtn>
                <MdOutlineFileUpload />
              </FullRondedBtn>
            </div>
          ) : (
            <div>
              <Button
                onPress={onOpen}
                className=" px-3 py-2 !mx-auto !mt-5 rounded-[50px] !text-black !bg-gray-300"
              >
                Chỉnh sửa hồ sơ
              </Button>
              <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                  <h1>hi</h1>
                </ModalContent>
              </Modal>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
