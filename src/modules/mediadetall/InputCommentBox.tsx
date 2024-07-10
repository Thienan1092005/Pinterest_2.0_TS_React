import AvatarOrName from "@/components/customUi/AvatarOrName";
import { useImageContext } from "@/hooks/useImageContext";
import { Input } from "@nextui-org/react";
import { IoSend } from "react-icons/io5";
import cn from "classnames";
import { useSelector } from "react-redux";
import { selectAuth } from "@/redux/slices/authSlice";
export default function InputCommentBox() {
  const { imageData } = useImageContext();
  const { currentUser } = useSelector(selectAuth);
  if (!currentUser) return;
  const { avatar, full_name } = currentUser;
  if (!imageData) return;
  return (
    <div className=" flex mt-[15px] h-fit gap-x-2">
      <AvatarOrName size="md" src={avatar} fullName={full_name} />
      <div className={cn("  relative w-full ")}>
        <Input
          placeholder={"Viết bình luận với tư cách " + full_name + " ..."}
          className={cn("  w-full h-full ")}
          type="text"
        />
        <button className="absolute text-primary-red-color px-4 py-2 right-2 top-1/2 -translate-y-1/2 ">
          <IoSend />
        </button>
      </div>
    </div>
  );
}
