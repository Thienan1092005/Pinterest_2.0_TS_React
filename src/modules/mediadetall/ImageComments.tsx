import LoadingSpinner from "@/components/LoadingSpinner";
import CommentItem from "./CommentItem";
import { useCommentContext } from "@/hooks/useCommentContext";

export default function ImageComments() {
  const { commentList, isLoading } = useCommentContext();
  const notReplyComment = commentList?.filter((comment) => {
    return !comment.reply_to;
  });
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
              {notReplyComment?.map((comment) => (
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
