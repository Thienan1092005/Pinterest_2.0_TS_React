import { GetCommentsByIdItemtype } from "@/apis/interfaces";
import { getCommentsByIdApi } from "@/apis/mediaApi";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import CommentItem from "./CommentItem";

export default function ImageComments() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [commentList, setCommentList] = useState<
    GetCommentsByIdItemtype[] | null
  >(null);
  const { id } = useParams();

  useEffect(() => {
    const getImageComments = async () => {
      try {
        setIsLoading(true);
        if (!id) return;
        const { data } = await getCommentsByIdApi(+id);
        const commentNotReply = data.items.filter(
          (comment) => !comment.reply_to
        );
        setCommentList(commentNotReply);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getImageComments();
  }, [id]);

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className=" w-full mt-5 font-sf-regular">
          {commentList && commentList.length < 1 ? (
            <EmptyCommnet />
          ) : (
            <>
              <h1 className=" mb-5 font-sf-bold ">{" Tất cả  nhận xét"}</h1>
              {commentList?.map((comment) => (
                <CommentItem comment={comment} key={comment.id} />
              ))}
            </>
          )}
        </div>
      )}
    </>
  );
}
const EmptyCommnet = () => {
  return (
    <>
      <h1 className="mb-5 font-sf-medium ">Chưa có bình luận</h1>
      <p className=" font-sf-light text-[rgba(0,0,0,0.6)] ">
        Thêm nhận xét để bắt đầu cuộc trò chuyện
      </p>
    </>
  );
};
