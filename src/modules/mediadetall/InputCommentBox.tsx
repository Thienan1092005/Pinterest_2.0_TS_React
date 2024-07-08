import AvatarOrName from "@/components/customUi/AvatarOrName";
import { useImageContext } from "@/hooks/useImageContext";
import { Input } from "@nextui-org/react";
import { IoSend } from "react-icons/io5";
import cn from "classnames";
export default function InputCommentBox() {
  const { imageData } = useImageContext();
  if (!imageData) return;
  const { user } = imageData;
  const { full_name, avatar } = user;
  return (
    <div className=" flex mt-[15px] h-fit gap-x-2">
      <AvatarOrName size="md" src={avatar} fullName={full_name} />
      <div className={cn("  relative w-full ")}>
        <Input
          placeholder="Viết bình luận ...."
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
