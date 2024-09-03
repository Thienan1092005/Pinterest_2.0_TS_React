import { GetCommentsByIdItemtype } from "@/apis/interfaces";
import {
  getCommentsByImageIdApi,
  handleDeleteCommentApi,
} from "@/apis/mediaApi";
import AvatarOrName from "@/components/customUi/AvatarOrName";
import { handleGetTimeOut } from "@/hepler";
import { useCommentContext } from "@/hooks/useCommentContext";
import { selectAuth } from "@/redux/slices/authSlice";

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { useEffect, useId, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { MdMoreHoriz } from "react-icons/md";
import ReplyCommentItem from "./ReplyCommentItem";
interface IProps {
  comment: GetCommentsByIdItemtype;
}
export default function CommentItem({ comment }: IProps) {
  const { toggleReFetch, setCreateComment, createComment } =
    useCommentContext();
  const { id } = useParams();
  const { currentUser } = useSelector(selectAuth);
  const [showReply, setShowReply] = useState(false);
  const key = useId();
  const [commentReply, setCommentReply] = useState<
    GetCommentsByIdItemtype[] | null
  >(null);
  const { content, user, id: commentId, created_at } = comment;
  const { avatar, full_name, id: usercommentid } = user;

  const handleDeleteComment = async () => {
    try {
      await handleDeleteCommentApi(+commentId, currentUser?.accessToken || "");
      toggleReFetch();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const getCommentReply = async () => {
      try {
        if (!id || !commentId) return;
        const { data } = await getCommentsByImageIdApi(+id, {
          replyTo: +commentId,
        });
        setCommentReply(data.items);
      } catch (error) {
        console.log(error);
      }
    };
    getCommentReply();
  }, [id, commentId]);

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setCreateComment((p) => ({
          ...p,
          reply: { ...p.reply, isReply: false },
        }));
      }
    };
    if (createComment.reply.isReply) {
      window.addEventListener("keydown", handleKeydown);
    } else {
      window.removeEventListener("keydown", handleKeydown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [setCreateComment, createComment.reply.isReply]);

  return (
    <div className="w-full mb-5">
      <div className="flex gap-x-2">
        <AvatarOrName size="sm" src={avatar} name={full_name} />
        <div>
          <h1 className="font-sf-bold">{full_name}</h1>
          <p className="font-sf-light  ">{content}</p>
          <div className="flex gap-x-2 font-sf-light mt-1 text-sm">
            <button>{handleGetTimeOut(created_at)} </button>
            <button>Thích</button>
            <button
              onClick={() =>
                setCreateComment((prev) => ({
                  ...prev,
                  isCreating: false,
                  reply: {
                    ...prev.reply,
                    isReply: true,
                    replyToUser: full_name,
                    replyToId: commentId,
                  },
                }))
              }
            >
              Phản hồi
            </button>
            {usercommentid == currentUser?.id && (
              <Dropdown>
                <DropdownTrigger>
                  <button className="flex transition-all duration-500 justify-center items-center text-[24px] rounded-full bg-white hover:bg-gray-300 ">
                    <MdMoreHoriz />
                  </button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Static Actions">
                  <DropdownItem
                    onClick={() => {
                      handleDeleteComment();
                    }}
                    key="delete"
                    className="text-danger"
                    color="danger"
                  >
                    Xoá
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            )}
          </div>
          {commentReply && showReply == false && commentReply?.length >= 1 && (
            <button
              onClick={() => setShowReply(true)}
              className=" mt-2"
            >{`xem tất cả ${commentReply?.length} câu trả lời`}</button>
          )}
        </div>
      </div>
      <div>
        {commentReply &&
          showReply == true &&
          commentReply.map((commentData) => (
            <ReplyCommentItem key={key} commentReplyData={commentData} />
          ))}
      </div>
    </div>
  );
}
