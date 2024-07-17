import { FaPinterest } from "react-icons/fa";
import { useNavigate } from "react-router";
import LiItemHaveABlackBorder from "./customUi/LiItemHaveABlackBorder";
import { Button, Modal, ModalContent, useDisclosure } from "@nextui-org/react";
import LoginForm from "./formSystem/LoginForm";
import SignupForm from "./formSystem/SignupForm";

export default function UnSignHeader() {
  const loginDisclosure = useDisclosure();
  const signupDisclosure = useDisclosure();
  const navigate = useNavigate();

  return (
    <div className="p-4 z-20 h-[80px] fixed font-sf-bold  flex w-full bg-white justify-between text-[16px] items-center">
      {/* left header */}
      <div className="flex gap-x-2 ">
        <div
          className="flex items-center cursor-pointer "
          onClick={() => {
            navigate("/");
          }}
        >
          <FaPinterest className="text-[24px] text-primary-red-color mr-1" />
          <h1 className="text-primary-red-color font-sf-bold  ">Yukiterest</h1>
        </div>
        <div
          onClick={() => {
            navigate("/news");
          }}
          className="p-2 rounded-[8px] cursor-pointer font-[600] hover:bg-gray-300 transition-all duration-500 "
        >
          Khám Phá
        </div>
      </div>
      {/* right header */}
      <div className="flex items-center gap-x-[30px]">
        <ul className="flex gap-x-[30px]">
          <LiItemHaveABlackBorder>Giới thiệu</LiItemHaveABlackBorder>
          <LiItemHaveABlackBorder>Doanh Nghiệp </LiItemHaveABlackBorder>
          <LiItemHaveABlackBorder>Blog</LiItemHaveABlackBorder>
        </ul>
        <div className="flex gap-x-[15px]">
          <div>
            <Button
              onPress={loginDisclosure.onOpen}
              className="px-3 flex justify-center  items-center  py-2 text-white font-[600] min-w-[50px] cursor-pointer rounded-[20px] bg-primary-red-color"
            >
              Đăng Nhập
            </Button>
            <Modal
              isOpen={loginDisclosure.isOpen}
              onOpenChange={loginDisclosure.onOpenChange}
            >
              <ModalContent>
                {(onclose) => <LoginForm onclose={onclose} />}
              </ModalContent>
            </Modal>
          </div>
          <div>
            <Button
              onPress={signupDisclosure.onOpen}
              className="px-3 flex justify-center  items-center  py-2 text-black font-[600] min-w-[50px] cursor-pointer rounded-[20px] bg-pink-100 -red-color"
            >
              Đăng Ký
            </Button>
            <Modal
              isOpen={signupDisclosure.isOpen}
              onOpenChange={signupDisclosure.onOpenChange}
            >
              <ModalContent>{<SignupForm />}</ModalContent>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
}
