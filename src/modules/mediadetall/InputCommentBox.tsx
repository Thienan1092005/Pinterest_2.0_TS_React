import AvatarOrName from "@/components/customUi/AvatarOrName";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
} from "@nextui-org/react";
import { IoCloseCircleSharp, IoSend } from "react-icons/io5";
import cn from "classnames";
import { useSelector } from "react-redux";
import { selectAuth } from "@/redux/slices/authSlice";
import { MdEmojiEmotions } from "react-icons/md";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { createCommentApi } from "@/apis/mediaApi";
import { useCommentContext } from "@/hooks/useCommentContext";
import EmojiPicker from "emoji-picker-react";
export default function InputCommentBox() {
  const { id } = useParams();
  const { toggleReFetch, replyTarget, setReplyTarget } = useCommentContext();
  const { currentUser } = useSelector(selectAuth);
  const [commentContent, setCommentContent] = useState<string>("");
  const inputCommentRef = useRef<HTMLInputElement>(null);
  const handleComment = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (!id || commentContent == "") return;
      if (replyTarget) {
        await createCommentApi(+id, commentContent, replyTarget.userTargetId);
        setCommentContent("");
        setReplyTarget(undefined);
        toggleReFetch();
      } else {
        await createCommentApi(+id, commentContent);
        setCommentContent("");
        toggleReFetch();
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (replyTarget) inputCommentRef.current?.focus();
  }, [replyTarget]);

  return (
    <div className=" flex mt-[15px] relative h-fit gap-x-2">
      <AvatarOrName
        size="md"
        src={currentUser?.avatar}
        fullName={currentUser?.full_name}
      />
      <div className={cn("  relative w-full ")}>
        <form onSubmit={handleComment}>
          <Input
            ref={inputCommentRef}
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
            placeholder={
              replyTarget
                ? "đang trả lời" + " " + replyTarget.userTargetName
                : "Viết bình luận với tư cách " +
                  currentUser?.full_name +
                  " ..."
            }
            className={cn("  w-full h-full ")}
            type="text"
          />
          <div className=" absolute right-2 top-1/2 -translate-y-1/2 text-primary-red-color ">
            {replyTarget && (
              <button
                type="button"
                className=" p-1 rounded-full   bg-primary-red-color text-white "
                onClick={() => {
                  setReplyTarget(undefined);
                }}
              >
                <IoCloseCircleSharp />
              </button>
            )}
            <Dropdown placement="top" closeOnSelect={false}>
              <DropdownTrigger>
                <button className="  px-4 py-2  ">
                  <MdEmojiEmotions />
                </button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem>
                  <EmojiPicker
                    onEmojiClick={(e) => {
                      setCommentContent((prew) => prew + e.emoji);
                    }}
                    open={true}
                    className="top-0 absolute"
                  />
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>

            <button className="px-4 py-2  ">
              <IoSend />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
