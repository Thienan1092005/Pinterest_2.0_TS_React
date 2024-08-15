import RoundedButton from "@/components/customUi/RoundedButton";
import ImageForm, { ImageFormRefs } from "./ImageForm";
import { useRef } from "react";
import { useToggle } from "@smojs/react-hooks";
import { Spinner } from "@nextui-org/react";

export default function CreateGhim() {
  const imageFormRefs = useRef<ImageFormRefs>(null); // Đổi tên biến để tránh trùng tên
  const [isLoading, toggleLoading] = useToggle(false);

  return (
    <div className="text-[24px] flex-1 font-sf-regular">
      <div className="flex w-full border-b-1 border-black/50 h-[80px] px-4 items-center justify-between">
        <h1>Tạo Ghim</h1>
        <RoundedButton
          onClick={() => {
            if (!imageFormRefs.current) return;
            imageFormRefs.current.submitRef?.click();
          }}
          className="font-sf-regular !text-[16px]"
          disabled={isLoading}
        >
          {isLoading ? <Spinner className="text-white" /> : "Đăng"}
        </RoundedButton>
      </div>
      <ImageForm toggleLoading={toggleLoading} ref={imageFormRefs} />
    </div>
  );
}
