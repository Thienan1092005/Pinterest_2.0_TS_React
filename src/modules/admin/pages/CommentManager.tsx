import { MediaDetailResponseType } from "@/apis/interfaces";
import { getCommentsByImageIdApi, getImageDetailById } from "@/apis/mediaApi";
import { useDebounce } from "@smojs/react-hooks";
import { useEffect, useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import CommentTable from "../CommentTable";
import { handleGetTimeOut } from "@/hepler";
import { useQuery } from "@tanstack/react-query";

export default function CommentManager() {
  const [commentSearchValues, setCommentSearchValue] = useState("");
  const commentSearchValueDebounce = useDebounce(commentSearchValues);

  const [pinInfo, setPinInfo] = useState<MediaDetailResponseType | undefined>();
  useEffect(() => {
    if (commentSearchValueDebounce == "") return;
    if (isNaN(+commentSearchValueDebounce)) alert("id không phải là chữ");
    const getImgData = async () => {
      try {
        const data = await getImageDetailById(+commentSearchValueDebounce);
        setPinInfo(data);
      } catch (error) {
        console.log(error);
      }
    };
    getImgData();
  }, [commentSearchValueDebounce]);
  const { data: commentList } = useQuery({
    queryKey: ["imageCommentList", commentSearchValueDebounce],
    queryFn: async () => {
      try {
        const data = await getCommentsByImageIdApi(+commentSearchValueDebounce);
        return data.data.items;
      } catch (error) {
        console.log(error);
      }
    },
    staleTime: 1000 * 180,
  });
  return (
    <div className="w-[90%]  ">
      <div className="w-[50%] my-5 block mx-auto 2xl:w-1/2 relative bg-[#f1f1f1] h-[48px] rounded-[25px]">
        <input
          value={commentSearchValues}
          onChange={(e) => {
            setCommentSearchValue(e.target.value);
          }}
          className="absolute text-black/60 font-sf-medium pl-[35px] bg-transparent rounded-[25px] outline-none border-[3px] focus:border-ocren-blue w-full h-full"
          type="text"
          placeholder="nhập id pin vào đây"
        />
        <FaMagnifyingGlass className="absolute left-[16px] top-1/2 -translate-y-1/2" />
      </div>
      {pinInfo && commentList && commentList?.length > 0 && (
        <div className=" flex gap-x-5 h-[150px]">
          <img
            className=" h-full rounded-lg object-cover"
            src={pinInfo.image[0].url}
            alt=""
          />
          <div>
            <PinInfoTag tagName="Name" tagContent={pinInfo.name} />
            <PinInfoTag
              tagName="Creator "
              tagContent={pinInfo.user.full_name}
            />
            <PinInfoTag
              tagName="Total comment"
              tagContent={commentList.length.toString()}
            />
            <PinInfoTag
              tagName="Create at "
              tagContent={handleGetTimeOut(pinInfo.created_at)}
            />
          </div>
        </div>
      )}
      <CommentTable
        comments={commentList}
        searchComment={commentSearchValueDebounce}
      />
    </div>
  );
}
const PinInfoTag = ({
  tagName,
  tagContent,
}: {
  tagName: string;
  tagContent: string;
}) => {
  return (
    <div className=" flex">
      <span className=" font-sf-bold ">{tagName + ":"}</span>
      <h1 className=" inline-block ml-2 ">{tagContent}</h1>
    </div>
  );
};
