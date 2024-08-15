import { User } from "@/apis/interfaces";
import { getListUserApi } from "@/apis/userApi";
import { useEffect, useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useDebounce } from "@smojs/react-hooks";
import UserTable from "../UserTable";

export default function UserManager() {
  const [userSearchValue, setUserSearchValue] = useState<string>("");
  const userSearchValueDebounce = useDebounce(userSearchValue);
  const [inSearchMode, setInSearchMode] = useState(false);
  const [searchUserData, setSearchUserData] = useState<User[]>([]);
  useEffect(() => {
    const searchUser = async () => {
      try {
        const user = await getListUserApi(userSearchValueDebounce);
        setInSearchMode(true);
        setSearchUserData(user.data.items);
      } catch (error) {
        console.log(error);
      }
    };

    if (userSearchValueDebounce) {
      searchUser();
    } else {
      setInSearchMode(false);
    }
  }, [userSearchValueDebounce]);
  return (
    <>
      <div className="w-[90%]  ">
        <div className="w-[50%] my-5 block mx-auto 2xl:w-1/2 relative bg-[#f1f1f1] h-[48px] rounded-[25px]">
          <input
            value={userSearchValue}
            onChange={(e) => {
              setUserSearchValue(e.target.value);
            }}
            className="absolute text-black/60 font-sf-medium pl-[35px] bg-transparent rounded-[25px] outline-none border-[3px] focus:border-ocren-blue w-full h-full"
            type="text"
            placeholder="tìm kiếm người dùng"
          />
          <FaMagnifyingGlass className="absolute left-[16px] top-1/2 -translate-y-1/2" />
        </div>
        <UserTable
          searchUserData={searchUserData}
          inSearchMode={inSearchMode}
        />
      </div>
    </>
  );
}
