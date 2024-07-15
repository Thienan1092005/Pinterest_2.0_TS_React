import { GetCommentsByIdItemtype } from "@/apis/interfaces";
import { handleDeleteCommentApi } from "@/apis/mediaApi";
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
import { MdMoreHoriz } from "react-icons/md";
import { useSelector } from "react-redux";

interface IProps {
  commentReplyData: GetCommentsByIdItemtype;
}

export default function ReplyCommentItem({ commentReplyData }: IProps) {
  const {
    content,
    user,
    created_at,
    id: commentId,
    reply_to,
  } = commentReplyData;
  const { avatar, full_name, id: usercommentid } = user;
  const { currentUser } = useSelector(selectAuth);
  const { toggleReFetch, setReplyTarget } = useCommentContext();
  return (
    <div className="flex gap-x-2 pl-10 mt-[10px]">
      <AvatarOrName size="sm" src={avatar} name={full_name} />
      <div>
        <h1 className="font-sf-bold">{full_name}</h1>
        <p className="font-sf-light max-w-[80%]">{content}</p>
        <div className="flex gap-x-2 font-sf-light mt-1 text-sm">
          <button>{handleGetTimeOut(created_at)} </button>
          <button>Thích</button>
          <button
            onClick={() => {
              if (!reply_to) return;
              setReplyTarget({
                userTargetName: full_name,
                userTargetId: reply_to,
              });
            }}
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
                    handleDeleteCommentApi(commentId);
                    toggleReFetch();
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
      </div>
    </div>
  );
}
