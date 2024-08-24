import LoadingSpinner from "@/components/LoadingSpinner";
import CommentItem from "./CommentItem";
import { useCommentContext } from "@/hooks/useCommentContext";
import { useEffect, useState } from "react";
import { GetCommentsByIdItemtype } from "@/apis/interfaces";
import { useSelector } from "react-redux";
import { selectAuth } from "@/redux/slices/authSlice";
import WaitingComment from "./WaitingComment";
export default function ImageComments() {
  const { commentList, createComment, isLoading } = useCommentContext();
  const [currentCommentList, setCurrentCommnetList] =
    useState<GetCommentsByIdItemtype[]>();
  const { currentUser } = useSelector(selectAuth);
  const notReplyComment = commentList?.filter((comment) => {
    return !comment.reply_to;
  });
  useEffect(() => {
    if (!notReplyComment) return;
    setCurrentCommnetList(notReplyComment);
  }, [commentList, notReplyComment]);
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
              {currentCommentList?.map((comment) => (
                <CommentItem comment={comment} key={comment.id} />
              ))}
            </>
          )}
          {currentUser && createComment.isCreating && (
            <WaitingComment
              avatar={currentUser?.avatar}
              full_name={currentUser?.full_name}
              content={createComment.content}
            />
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
