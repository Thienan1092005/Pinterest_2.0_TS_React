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

interface IProps {
  comment: GetCommentsByIdItemtype;
}

export default function CommentItem({ comment }: IProps) {
  const { replyTarget, toggleReFetch, setReplyTarget } = useCommentContext();
  const { id } = useParams();
  const { currentUser } = useSelector(selectAuth);

  const key = useId();
  const [commentReply, setCommentReply] = useState<
    GetCommentsByIdItemtype[] | null
  >(null);
  const { content, user, id: commentId, created_at } = comment;
  const { avatar, full_name, id: usercommentid } = user;

  const handleDeleteComment = async () => {
    try {
      await handleDeleteCommentApi(+commentId, accessToken);
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
        setReplyTarget(undefined);
      }
    };

    if (replyTarget) {
      window.addEventListener("keydown", handleKeydown);
    } else {
      window.removeEventListener("keydown", handleKeydown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [replyTarget, setReplyTarget]);
  if (!currentUser) return;
  const { id: currentUserIds, accessToken } = currentUser;
  return (
    <div className="w-full mb-5">
      <div className="flex gap-x-2">
        <AvatarOrName size="sm" src={avatar} name={full_name} />
        <div>
          <h1 className="font-sf-bold">{full_name}</h1>
          <p className="font-sf-light">{content}</p>
          <div className="flex gap-x-2 font-sf-light mt-1 text-sm">
            <button>{handleGetTimeOut(created_at)} </button>
            <button>Thích</button>
            <button
              onClick={() =>
                setReplyTarget({
                  userTargetName: full_name,
                  userTargetId: commentId,
                })
              }
            >
              Phản hồi
            </button>
          </div>
        </div>
        {usercommentid == currentUserIds && (
          <Dropdown>
            <DropdownTrigger>
              <button className="flex transition-all duration-500 justify-center items-center text-[20px] rounded-full bg-white hover:bg-gray-300 w-12 h-12">
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
      <div>
        {commentReply &&
          commentReply.map(({ user: { avatar, full_name }, content }) => (
            <ReplyComment
              key={key}
              avatar={avatar}
              content={content}
              fullName={full_name}
            />
          ))}
      </div>
    </div>
  );
}

interface IReplyComment {
  avatar: string;
  fullName: string;
  content: string;
}

const ReplyComment = ({ avatar, fullName, content }: IReplyComment) => {
  return (
    <div className="flex gap-x-2 pl-10 mt-[10px]">
      <AvatarOrName size="sm" src={avatar} name={fullName} />
      <div>
        <h1 className="font-sf-bold">{fullName}</h1>
        <p className="font-sf-light">{content}</p>
      </div>
    </div>
  );
};
