import { getUserInfoApi } from "@/apis/userApi";
import LoadingSpinner from "@/components/LoadingSpinner";
import UserCard from "@/components/UserCard";
import { Tab, Tabs } from "@nextui-org/react";
import { useAsync } from "@smojs/react-hooks";
import { useNavigate, useParams } from "react-router";
import Created from "../accoutdetall/Created";
import Saved from "../accoutdetall/Saved";
import { getListImagesApi } from "@/apis/mediaApi";

export default function UserProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const getUserData = async () => {
    try {
      if (!id) return navigate("/news");
      const data = await getUserInfoApi(+id);
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  const getUserImageUploaded = async () => {
    try {
      if (!id) return navigate("/news");
      const data = getListImagesApi(undefined, undefined, +id);
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  const { data: ImageData } = useAsync(getUserImageUploaded, [id]);
  const { data, isLoading } = useAsync(getUserData, [id]);
  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        data &&
        id &&
        ImageData && (
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
                  <Saved id={+id} />
                </Tab>
              </Tabs>
            </div>
          </div>
        )
      )}
    </>
  );
}
