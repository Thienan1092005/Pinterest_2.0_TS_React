import RoundedButton from "@/components/customUi/RoundedButton";
import ImageForm from "./ImageForm";
import { useRef } from "react";
import { useToggle } from "@smojs/react-hooks";
import { Spinner } from "@nextui-org/react";

export default function CreateGhim() {
  const submitBtnRef = useRef<HTMLButtonElement>(null);
  const [isLoading, toggleLoading] = useToggle(false);

  return (
    <div className=" text-[24px] flex-1 font-sf-regular">
      <div className=" flex w-full border-b-1 border-black/50  h-[80px] px-4 items-center justify-between">
        <h1>Tạo Ghim</h1>
        <RoundedButton
          onClick={() => {
            submitBtnRef.current?.click();
          }}
          className=" font-sf-regular !text-[16px]"
          disabled={isLoading}
        >
          {isLoading ? <Spinner className=" text-white" /> : "Đăng "}
        </RoundedButton>
      </div>
      <ImageForm toggleLoading={toggleLoading} ref={submitBtnRef} />
    </div>
  );
}
