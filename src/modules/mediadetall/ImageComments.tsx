import LoadingSpinner from "@/components/LoadingSpinner";
import CommentItem from "./CommentItem";
import { useCommentContext } from "@/hooks/useCommentContext";
import { GetCommentsByIdItemtype } from "@/apis/interfaces";
import { useSelector } from "react-redux";
import { selectAuth } from "@/redux/slices/authSlice";
import WaitingComment from "./WaitingComment";
import { useEffect, useState } from "react";
import { socket } from "@/configs/socket.config";
import { useParams } from "react-router";
import classNames from "classnames";

enum CommentEvents {
  SUB_MEDIA_ID = "subMediaID",
  NEW_COMMENT = "newComment",
}

export default function ImageComments() {
  const [show, setShow] = useState(false);
  const { commentList, createComment, isLoading, toggleReFetch } =
    useCommentContext();
  const { currentUser } = useSelector(selectAuth);
  const { id } = useParams();
  const maninComment = commentList?.filter((comment) => {
    return comment.level === 0;
  });
  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }
    socket.emit(CommentEvents.SUB_MEDIA_ID, id);
    socket.on(CommentEvents.NEW_COMMENT, async (comment) => {
      console.log("newComment received:", comment);
      setShow(true);
    });

    return () => {
      socket.disconnect();
      setShow(false);
    };
  }, [id, toggleReFetch]);
  console.log(commentList);
  return (
    <>
      {isLoading && !commentList ? (
        <LoadingSpinner />
      ) : (
        <div className="w-full mt-5  relative font-sf-regular">
          {currentUser && createComment.isCreating && (
            <WaitingComment
              avatar={currentUser?.avatar}
              full_name={currentUser?.full_name}
              content={createComment.content}
            />
          )}
          {commentList && commentList.length < 1 ? (
            <EmptyCommnet />
          ) : (
            <>
              <h1 className="mb-5 font-sf-bold">{"Tất cả nhận xét"}</h1>
              {maninComment?.map((comment: GetCommentsByIdItemtype) => (
                <CommentItem comment={comment} key={comment.id} />
              ))}
              <button
                onClick={() => {
                  toggleReFetch();
                }}
                className={classNames(
                  " absolute bottom-[-120px] left-1/2 -translate-x-1/2 font-sf-bold bg-blue-500 text-white rounded-2xl px-5 py-1  transition-all hidden ",
                  { "-translate-y-[50px] !block": show }
                )}
              >
                có nhận xét mới
              </button>
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
      <p className="font-sf-light text-[rgba(0,0,0,0.6)]">
        Thêm nhận xét để bắt đầu cuộc trò chuyện
      </p>
    </>
  );
};
