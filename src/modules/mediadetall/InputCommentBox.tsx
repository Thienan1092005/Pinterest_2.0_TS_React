import { FormEvent, useEffect, useRef, useState } from "react";
import AvatarOrName from "@/components/customUi/AvatarOrName";
import { Input } from "@nextui-org/react";
import { IoCloseCircleSharp, IoSend } from "react-icons/io5";
import cn from "classnames";
import { useSelector } from "react-redux";
import { selectAuth } from "@/redux/slices/authSlice";
import { MdEmojiEmotions } from "react-icons/md";
import { useCommentContext } from "@/hooks/useCommentContext";
import { createCommentApi } from "@/apis/mediaApi";
import { useParams } from "react-router";

export default function InputCommentBox() {
  const { id } = useParams();
  const { toggleReFetch, createComment, setCreateComment } =
    useCommentContext();
  const { currentUser } = useSelector(selectAuth);
  const [commentContent, setCommentContent] = useState<string>("");
  const inputCommentRef = useRef<HTMLInputElement>(null);

  const handleComment = async (e: FormEvent) => {
    e.preventDefault();
    if (!id || commentContent.trim() === "") return;
    setCreateComment((p) => ({ ...p, isCreating: true }));
    try {
      const replyToId = createComment.reply.isReply
        ? createComment.reply.replyToId
        : undefined;
      await createCommentApi(+id, commentContent, replyToId);
      setCommentContent("");
      toggleReFetch();
    } catch (error) {
      console.error(error);
    } finally {
      setCreateComment((p) => ({
        ...p,
        isCreating: false,
        reply: { ...p.reply, isReply: false },
      }));
    }
  };

  useEffect(() => {
    if (createComment.reply.isReply) inputCommentRef.current?.focus();
  }, [createComment.reply.isReply]);

  return (
    <div className="flex mt-[15px] relative h-fit gap-x-2">
      <AvatarOrName
        size="md"
        src={currentUser?.avatar}
        fullName={currentUser?.full_name}
      />
      <div className={cn("relative w-full")}>
        <form onSubmit={handleComment}>
          <Input
            ref={inputCommentRef}
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
            placeholder={
              createComment.reply.isReply
                ? "Đang trả lời " + createComment.reply.replyToUser
                : "Viết bình luận với tư cách " + currentUser?.full_name
            }
            className="w-full"
            type="text"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 text-primary-red-color">
            {createComment.reply.isReply && (
              <button
                type="button"
                className="p-1 rounded-full bg-primary-red-color text-white"
                onClick={() =>
                  setCreateComment((p) => ({
                    ...p,
                    reply: { ...p.reply, isReply: false },
                  }))
                }
              >
                <IoCloseCircleSharp />
              </button>
            )}
            <button className="px-4 py-2">
              <MdEmojiEmotions />
            </button>
            <button type="submit" className="px-4 py-2">
              <IoSend />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
