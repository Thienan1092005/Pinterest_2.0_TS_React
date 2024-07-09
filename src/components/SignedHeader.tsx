import { FaBell, FaPinterest } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import classNames from "classnames";
import { FaMagnifyingGlass } from "react-icons/fa6";
import RoundedButton from "./customUi/RoundedButton";
import { AiFillMessage } from "react-icons/ai";
import { GoChevronUp } from "react-icons/go";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/slices/authSlice";

const navItems = [
  { name: "Trang chủ", to: "/news" },
  { name: "Tạo", to: "/createpost" },
];
const listBtn = [
  { icon: <FaBell /> },
  { icon: <AiFillMessage /> },
  {
    icon: (
      <img
        className=" rounded-full"
        src="https://i.pinimg.com/736x/19/b3/21/19b321a64ef16becca70afbd3310f725.jpg"
        alt=""
      />
    ),
  },
];
export default function SignedHeader() {
  const dispatch = useDispatch();
  return (
    <div className=" px-[16px] py-[4px] z-20 h-[80px] fixed font-sf-bold  flex w-full bg-white justify-between text-[16px] items-center">
      {/* header left */}
      <div className="flex justify-around items-center gap-x-2 ">
        <FaPinterest className="text-[24px] text-primary-red-color mr-1" />
        {navItems.map(({ name, to }) => (
          <NavLink
            to={to}
            key={to}
            className={({ isActive }) => {
              return classNames(
                " px-4 h-[48px] bg-white flex justify-center items-center rounded-[25px]  text-black",
                { "!bg-black !text-white": isActive }
              );
            }}
          >
            {name}
          </NavLink>
        ))}
      </div>
      {/* header center */}
      <div className="w-[75%]  relative bg-[#f1f1f1] h-[48px] rounded-[25px] ">
        <input
          className=" absolute text-black/60 font-sf-medium pl-[35px] bg-transparent rounded-[25px] outline-none border-[3px]  focus:border-ocren-blue   w-full h-full "
          type="text"
          placeholder="tìm kiếm ý tưởng , hình ảnh , nhiều thứ khác .... "
        />
        <FaMagnifyingGlass className=" absolute left-[16px] top-1/2 -translate-y-1/2 " />
      </div>
      {/* header  right  */}
      <div className="flex justify-around items-center">
        {listBtn.map(({ icon }) => (
          <RoundedButton
            key={new Date().getTime()}
            className="hover:bg-pinter-gray text-[24px]  bg-white !text-black !rounded-full w-12 h-12"
          >
            {icon}
          </RoundedButton>
        ))}

        <Dropdown>
          <DropdownTrigger>
            <button className="hover:bg-pinter-gray grid place-items-center !duration-500 text-[24px]  bg-white !text-black !rounded-full w-12 h-12">
              <GoChevronUp className=" rotate-[180deg]" />
            </button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions">
            <DropdownItem key="new">New file</DropdownItem>
            <DropdownItem key="copy">Copy link</DropdownItem>
            <DropdownItem key="edit">Edit file</DropdownItem>
            <DropdownItem
              onClick={() => {
                dispatch(logout());
              }}
              key="delete"
              className="text-danger"
              color="danger"
            >
              Delete file
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  );
}
