import { FaBell, FaPinterest } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import classNames from "classnames";
import { FaMagnifyingGlass } from "react-icons/fa6";
import RoundedButton from "./customUi/RoundedButton";
import { AiFillMessage } from "react-icons/ai";
import { GoChevronUp } from "react-icons/go";
import { Dropdown, DropdownTrigger } from "@nextui-org/react";
import { selectAuth } from "@/redux/slices/authSlice";
import { useSelector } from "react-redux";
import AvatarOrName from "./customUi/AvatarOrName";
import { Fragment } from "react/jsx-runtime";
import AccoutDropdown from "./customUi/AccoutDropdown";
const navItems = [
  { name: "Trang chủ", to: "/news" },
  { name: "Tạo", to: "/createpost" },
];
const listBtn = [
  {
    component: (
      <RoundedButton className="hover:bg-pinter-gray text-[24px]  bg-white !text-black !rounded-full w-12 h-12">
        <FaBell />
      </RoundedButton>
    ),
  },
  {
    component: (
      <RoundedButton className="hover:bg-pinter-gray text-[24px]  bg-white !text-black !rounded-full w-12 h-12">
        <AiFillMessage />
      </RoundedButton>
    ),
  },
  {
    component: <ProfileAvatar />,
  },
];
export default function SignedHeader() {
  return (
    <div className=" px-[16px] py-[4px] z-20 h-[80px] fixed font-sf-bold  flex w-full bg-white justify-between text-[16px] items-center">
      {/* header left */}
      <div className="flex justify-around items-center gap-x-2 ">
        <Link to={"/news"}>
          <FaPinterest className="text-[24px] text-primary-red-color mr-1" />
        </Link>
        {navItems.map(({ name, to }) => (
          <NavLink
            to={to}
            key={to}
            className={({ isActive }) => {
              return classNames(
                " px-4 h-[48px] shrink-[0] bg-white flex justify-center items-center rounded-[25px]  text-black",
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
        {listBtn.map(({ component }) => (
          <Fragment key={new Date().getTime()}>{component}</Fragment>
        ))}
        <Dropdown>
          <DropdownTrigger>
            <button className="hover:bg-pinter-gray grid place-items-center !duration-500 text-[24px]  bg-white !text-black !rounded-full w-12 h-12">
              <GoChevronUp className=" rotate-[180deg]" />
            </button>
          </DropdownTrigger>
          <AccoutDropdown />
        </Dropdown>
      </div>
    </div>
  );
}

function ProfileAvatar() {
  const { currentUser } = useSelector(selectAuth);
  return (
    <Link to={`profile`}>
      <AvatarOrName
        className=" rounded-full "
        avatarUrl={currentUser?.avatar}
        fullName={currentUser?.full_name || "Noname"}
      />
    </Link>
  );
}
