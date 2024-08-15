import { FaAngleLeft, FaPlus } from "react-icons/fa";
import ImageListItem from "./ImageListItem";
import { useId, useState } from "react";
import { useToggle } from "@smojs/react-hooks";
import cn from "classnames";
export default function ImageList() {
  console.log("re-render ImageList");
  const [listImage, setListImage] = useState([
    {
      imgUrl:
        "https://bmboosjxeycdzkofgsmx.supabase.co/storage/v1/object/public/Pinterrest_upload/1720695841747_449459709_1145036493423478_478577091240090309_n.jpg",
    },
  ]);
  const [isMiniSize, toggleMiniSize] = useToggle(false);
  const id = useId();
  return (
    <div
      className={cn(
        "border-r-1 text-[24px] min-h-screen border-black/50 w-fit"
      )}
    >
      <div className="border-b-1 border-black/50 p-4 h-[120px]">
        <div className={cn("flex w-full justify-between  px-4")}>
          <HiddenByMinisize isMiniSize={isMiniSize}>
            <h1>Tạo Ghim</h1>
          </HiddenByMinisize>
          <button
            onClick={() => {
              toggleMiniSize();
            }}
            className="flex transition-all duration-500 justify-center items-center text-[20px] rounded-full bg-white hover:bg-gray-300 w-12 h-12"
          >
            <FaAngleLeft
              className={cn("", {
                "rotate-180": isMiniSize,
              })}
            />
          </button>
        </div>
        <div className="grid place-items-center ">
          <button
            onClick={() => {
              setListImage((prev) => [
                ...prev,
                {
                  imgUrl:
                    "https://bmboosjxeycdzkofgsmx.supabase.co/storage/v1/object/public/Pinterrest_upload/1720695841747_449459709_1145036493423478_478577091240090309_n.jpg",
                },
              ]);
            }}
            className={cn(
              "font-sf-bold w-full transition-colors duration-300 text-[20px] rounded-full bg-gray-200 py-2 hover:bg-gray-300",
              {
                "!w-fit !p-3 mx-auto !bg-transparent hover:!bg-gray-200":
                  isMiniSize,
              }
            )}
          >
            {isMiniSize ? <FaPlus /> : "Tạo mới"}
          </button>
        </div>
      </div>
      <HiddenByMinisize isMiniSize={isMiniSize}>
        <div className="p-4">
          {listImage &&
            listImage.map((image, index) => (
              <ImageListItem
                setListImage={setListImage}
                key={id}
                imgUrl={image.imgUrl}
                index={index}
              />
            ))}
        </div>
      </HiddenByMinisize>
    </div>
  );
}

function HiddenByMinisize({
  isMiniSize,
  children,
}: {
  isMiniSize: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn("", {
        visible: !isMiniSize,
        "invisible hidden": isMiniSize,
      })}
    >
      {children}
    </div>
  );
}
