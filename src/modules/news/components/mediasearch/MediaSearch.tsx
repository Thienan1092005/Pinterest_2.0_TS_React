import { closeSearchModal, selectSearch } from "@/redux/slices/searchSlice";
import { useDispatch } from "react-redux";
import cn from "classnames";
import { useSelector } from "react-redux";
import SearchItem from "./SearchItem";
import { useEffect, useState } from "react";
import { getListImagesApi } from "@/apis/mediaApi";
import { MediaItemType } from "@/apis/interfaces";
import RoundedButton from "@/components/customUi/RoundedButton";
export default function MediaSearch() {
  const dispatch = useDispatch();
  const { search, searchKeyWord } = useSelector(selectSearch);
  const [searchItemData, setSearchItemData] = useState<MediaItemType[]>([]);

  useEffect(() => {
    const getSearchItem = async () => {
      try {
        const data = await getListImagesApi(
          undefined,
          undefined,
          undefined,
          searchKeyWord
        );
        setSearchItemData(data.items);
      } catch (error) {
        console.log(error);
      }
    };
    getSearchItem();
  }, [searchKeyWord]);

  return (
    <div
      className={cn("w-screen z-[15] h-screen fixed top-[80px]", {
        hidden: !search,
      })}
    >
      <div
        className="bg-black/50 w-full h-full absolute"
        onClick={() => {
          dispatch(closeSearchModal());
        }}
      ></div>
      <div className="p-5 bg-white w-[75%] h-auto min-h-[100px] mx-auto rounded-b-lg relative z-20">
        <div className="flex flex-wrap gap-4 ">
          {searchItemData.length < 1 ? (
            <div className=" w-full  border-t-1 border-gray-300 flex pt-5 justify-between ">
              <h1 className="font-sf-bold">
                Đang tìm kiếm ý tưởng bạn đã lưu ?
              </h1>
              <RoundedButton className=" !bg-gray-300 !text-black">
                Xem ý tưởng bạn đã lưu
              </RoundedButton>
            </div>
          ) : (
            searchItemData.map((image, i) => (
              <SearchItem key={i} image={image} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
