import { FaCheckCircle, FaPinterest } from "react-icons/fa";
import AvatarOrName from "./customUi/AvatarOrName";
import { useSelector } from "react-redux";
import { selectAuth } from "@/redux/slices/authSlice";
import { MdOutlineFileUpload } from "react-icons/md";
import FullRondedBtn from "./customUi/FullRondedBtn";
import {
  Button,
  Modal,
  ModalContent,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import { UserInfomationType } from "@/apis/interfaces";
import EditUserForm from "./formSystem/EditUserForm";
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
        <div>
          <samp className=" mr-3  font-sf-bold text-[40px]">
            {data.full_name}
          </samp>
          {data.id == 13 && (
            <Tooltip
              placement="right-end"
              classNames={{
                content: "bg-black text-white max-w-[250px]",
              }}
              content="Các tài khoản có huy hiệu đã xác minh đều đã được xác thực  cá nhân/thương hiệu nổi tiếng."
            >
              <button className=" w-auto p-0 h-auto bg-transparent">
                <FaCheckCircle className=" text-[#0866ff] text-[25px] " />
              </button>
            </Tooltip>
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
              <Modal
                className=" m-auto"
                isOpen={isOpen}
                onOpenChange={onOpenChange}
              >
                <ModalContent>
                  {(onClose) => <EditUserForm onClose={onClose} />}
                </ModalContent>
              </Modal>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
