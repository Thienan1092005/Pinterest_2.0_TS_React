import { MediaDetailResponseType } from "@/apis/interfaces";
import { getCommentsByImageIdApi, getImageDetailById } from "@/apis/mediaApi";
import { handleGetTimeOut } from "@/hepler";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import CommentTable from "./CommentTable";
import { useQuery } from "@tanstack/react-query";

export default function CommentDetallManager() {
  const { id } = useParams();
  const [pinInfo, setPinInfo] = useState<MediaDetailResponseType | null>(null);
  useEffect(() => {
    if (!id) return;
    const getPinInfo = async () => {
      try {
        const data = await getImageDetailById(+id);
        setPinInfo(data);
      } catch (erro) {
        console.log(erro);
      }
    };
    getPinInfo();
  }, [id]);

  const { data: commentList } = useQuery({
    queryKey: ["commentList", id],
    queryFn: async () => {
      try {
        if (!id) return;
        const data = await getCommentsByImageIdApi(+id);
        return data.data.items;
      } catch (erro) {
        console.log(erro);
      }
    },
  });
  return (
    <div className=" pl-10">
      {pinInfo && commentList && (
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
      <CommentTable comments={commentList} />
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
