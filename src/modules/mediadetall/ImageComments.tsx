import LoadingSpinner from "@/components/LoadingSpinner";
import CommentItem from "./CommentItem";
import { useCommentContext } from "@/hooks/useCommentContext";
import InfiniteScroll from "react-infinite-scroll-component";
import { GetCommentsByIdItemtype } from "@/apis/interfaces";
import { useSelector } from "react-redux";
import { selectAuth } from "@/redux/slices/authSlice";
import WaitingComment from "./WaitingComment";

export default function ImageComments() {
  const { commentList, createComment, isLoading, setPage, hasMoreComments } =
    useCommentContext();
  const { currentUser } = useSelector(selectAuth);

  return (
    <>
      {isLoading && !commentList ? (
        <LoadingSpinner />
      ) : (
        <div className="w-full mt-5 font-sf-regular">
          {commentList && commentList.length < 1 ? (
            <EmptyCommnet />
          ) : (
            <>
              <h1 className="mb-5 font-sf-bold">{"Tất cả nhận xét"}</h1>
              <InfiniteScroll
                dataLength={commentList?.length || 0}
                next={() => setPage((prev) => prev + 1)}
                hasMore={hasMoreComments}
                loader={<LoadingSpinner />}
              >
                {commentList?.map((comment: GetCommentsByIdItemtype) => (
                  <CommentItem comment={comment} key={comment.id} />
                ))}
              </InfiniteScroll>
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
      <p className="font-sf-light text-[rgba(0,0,0,0.6)]">
        Thêm nhận xét để bắt đầu cuộc trò chuyện
      </p>
    </>
  );
};
