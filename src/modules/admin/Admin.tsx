import { FaImage, FaPinterest, FaUserFriends } from "react-icons/fa";
import { Link, NavLink, Outlet, useMatch, useNavigate } from "react-router-dom";
import cn from "classnames";
import AvatarOrName from "@/components/customUi/AvatarOrName";
import { useSelector } from "react-redux";
import { selectAuth } from "@/redux/slices/authSlice";
import { BiSolidCommentDetail } from "react-icons/bi";
import { useEffect } from "react";

export default function Admin() {
  const listLink = [
    {
      to: "usermanagerment",
      name: "Quản lý người dùng",
      icon: <FaUserFriends className=" text-[24px]" />,
    },
    {
      to: "imagemanagerment",
      name: "Quản lý bin",
      icon: <FaImage className=" text-[24px]" />,
    },
    {
      to: "commentmanagerment",
      name: "Quản lý bình luận",
      icon: <BiSolidCommentDetail className=" text-[24px]" />,
    },
  ];
  const match = useMatch("admin");
  const Navigate = useNavigate();

  const { currentUser } = useSelector(selectAuth);
  useEffect(() => {
    if (match) Navigate("usermanagerment");
  }, [Navigate, match]);
  return (
    <div className="w-screen min-h-screen flex">
      <aside className="  min-h-screen w-[15%] bg-gray-50 fixed ">
        <Link to="/news">
          <div className="flex justify-center text-3xl my-4 items-center cursor-pointer ">
            <FaPinterest className="text-[24px] text-primary-red-color mr-1" />
            <h1 className="text-primary-red-color font-sf-bold  ">
              Yukiterest
            </h1>
          </div>
        </Link>

        <div className=" mx-auto my-[50px] text-center">
          <AvatarOrName
            className="mx-auto w-[80px] h-[80px]"
            name={currentUser?.full_name}
          />
          <h1 className=" my-4 text-[24px] font-sf-bold">
            {currentUser?.full_name}
          </h1>
        </div>
        {listLink.map(
          (
            { to, name, icon }: { to: string; name: string; icon: JSX.Element },
            i: number
          ) => (
            <NavLink
              key={i}
              className={({ isActive }) => {
                return cn(
                  " text-black mb-1 w-full rounded-sm px-10 justify-start py-4 font-sf-bold text-[16px] flex gap-x-4 items-center ",
                  {
                    " bg-gray-100 text-primary-red-color ": isActive,
                  }
                );
              }}
              to={to}
            >
              {icon}
              <span>{name}</span>
            </NavLink>
          )
        )}
      </aside>
      <div className=" ml-[15%] w-full pt-[100px] mx-auto">
        <Outlet />
      </div>
    </div>
  );
}
