import { logout, selectAuth } from "@/redux/slices/authSlice";
import {
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  Switch,
} from "@nextui-org/react";
import { TbLogout2 } from "react-icons/tb";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import AvatarOrName from "./AvatarOrName";
import { useNavigate } from "react-router";
import { FaMoon, FaSun } from "react-icons/fa";
export default function AccoutDropdown() {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const { currentUser } = useSelector(selectAuth);
  if (!currentUser) return;
  const { full_name, email, avatar, username } = currentUser;
  return (
    <DropdownMenu
      className=" py-5 px-2 rounded-2xl bg-white"
      aria-label="Static Actions"
    >
      <DropdownSection
        title="My Accout"
        classNames={{
          heading: "font-sf-bold text-[16px]",
        }}
      >
        <DropdownItem
          onClick={() => {
            Navigate(`profile`);
          }}
          showDivider
        >
          <div className=" flex gap-x-2 items-center">
            <div className=" relative w-[42px] h-[42px]  rounded-full  ">
              <AvatarOrName name={username} src={avatar} />
              <div className=" absolute w-3 h-3 rounded-full bottom-0 right-0 bg-green-500"></div>
            </div>
            <div>
              <h1 className=" font-sf-bold">{full_name}</h1>
              <p>{email}</p>
            </div>
          </div>
        </DropdownItem>
      </DropdownSection>
      <DropdownSection
        title="Khác"
        classNames={{
          heading: "font-sf-bold text-[16px]",
        }}
      >
        <DropdownItem closeOnSelect={false}>
          <Switch
            defaultSelected
            size="lg"
            color="danger"
            thumbIcon={({ isSelected }) =>
              isSelected ? (
                <FaMoon className="text-black" />
              ) : (
                <FaSun className="text-black" />
              )
            }
          >
            Dark mode
          </Switch>
        </DropdownItem>
        <DropdownItem
          onClick={() => {
            dispatch(logout());
          }}
          className="text-danger "
          color="danger"
        >
          <button className=" flex font-sf-bold items-center gap-x-1  ">
            <TbLogout2 />
            <h1>Logout</h1>
          </button>
        </DropdownItem>
      </DropdownSection>
    </DropdownMenu>
  );
}
