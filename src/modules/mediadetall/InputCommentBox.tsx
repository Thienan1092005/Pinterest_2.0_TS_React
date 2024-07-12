import AvatarOrName from "@/components/customUi/AvatarOrName";
import { useImageContext } from "@/hooks/useImageContext";
import { Input } from "@nextui-org/react";
import { IoCloseCircleSharp, IoSend } from "react-icons/io5";
import cn from "classnames";
import { useSelector } from "react-redux";
import { selectAuth } from "@/redux/slices/authSlice";
import { MdEmojiEmotions } from "react-icons/md";
import { FormEvent, useState } from "react";
import { useParams } from "react-router";
import { createCommentApi } from "@/apis/mediaApi";
import { useCommentContext } from "@/hooks/useCommentContext";

export default function InputCommentBox() {
  const { imageData } = useImageContext();
  const { id } = useParams();
  const { toggleReFetch, replyTarget, setReplyTarget } = useCommentContext();
  const { currentUser } = useSelector(selectAuth);
  const [commentContent, setCommentContent] = useState<string>("");

  if (!currentUser) return;
  const { avatar, full_name, accessToken } = currentUser;

  if (!imageData) return;

  const handleComment = async (e: FormEvent) => {
    e.preventDefault();
    if (!id || commentContent == "") return;
    if (replyTarget) {
      await createCommentApi(
        accessToken,
        +id,
        commentContent,
        replyTarget.userTargetId
      );
      setCommentContent("");
      setReplyTarget(undefined);
      toggleReFetch();
    } else {
      await createCommentApi(accessToken, +id, commentContent);
      setCommentContent("");
      toggleReFetch();
    }
  };

  return (
    <div className=" flex mt-[15px] relative h-fit gap-x-2">
      <AvatarOrName size="md" src={avatar} fullName={full_name} />
      <div className={cn("  relative w-full ")}>
        <form onSubmit={handleComment}>
          <Input
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
            placeholder={
              replyTarget
                ? "đang trả lời" + " " + replyTarget.userTargetName
                : "Viết bình luận với tư cách " + full_name + " ..."
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
            <button className="  px-4 py-2  ">
              <MdEmojiEmotions />
            </button>
            <button className="px-4 py-2  ">
              <IoSend />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
