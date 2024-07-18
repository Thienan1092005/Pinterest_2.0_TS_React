import { Tab, Tabs } from "@nextui-org/react";
import Saved from "./Saved";
import Created from "./Created";
import UserCard from "@/components/UserCard";
import { useSelector } from "react-redux";
import { selectAuth } from "@/redux/slices/authSlice";
import { useAsync } from "@smojs/react-hooks";
import { getUserInfoApi } from "@/apis/userApi";
import LoadingSpinner from "@/components/LoadingSpinner";
import { getListImagesApi } from "@/apis/mediaApi";
export default function AccoutDetall() {
  const { currentUser } = useSelector(selectAuth);
  const { data, isLoading } = useAsync(() => {
    return getUserInfoApi(currentUser?.id || -1);
  }, []);
  const getUserImageUploaded = async () => {
    try {
      const data = getListImagesApi(undefined, undefined, currentUser?.id);
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  const { data: ImageData } = useAsync(getUserImageUploaded, []);

  return isLoading ? (
    <LoadingSpinner />
  ) : (
    data && currentUser && ImageData && (
      <div className=" px-10">
        <UserCard data={data?.data} />
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
              <Created imageData={ImageData?.items} />
            </Tab>
            <Tab key="test" title="Đã lưu">
              <Saved id={currentUser?.id} />
            </Tab>
          </Tabs>
        </div>
      </div>
    )
  );
}
