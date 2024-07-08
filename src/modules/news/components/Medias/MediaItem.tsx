import { MediaItemType } from "@/apis/interfaces";
import LiItemHaveABlackBorder from "@/components/customUi/LiItemHaveABlackBorder";
import RoundedButton from "@/components/customUi/RoundedButton";
import { FaFileUpload } from "react-icons/fa";
import { IoIosMore } from "react-icons/io";
import ContextMenu from "./ContextMenu";
import {
  Avatar,
  Button,
  Image,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Tooltip,
} from "@nextui-org/react";
import { useNavigate } from "react-router";

interface IProps {
  mediaData: MediaItemType;
}

export default function MediaItem({ mediaData }: IProps) {
  const navigate = useNavigate();
  const { image, user, name, slug, id } = mediaData;
  return (
    <div>
      <div className="relative cursor-zoom-in w-full group">
        <Image
          loading="lazy"
          className="rounded-[20px] w-full"
          src={image[0].url}
          alt={image[0].img_name}
        />
        {/* Overlay */}
        <div
          onClick={() => {
            navigate(`/pin/${id}/${slug}`);
          }}
          className="absolute z-10 rounded-[20px] w-full h-full top-0 left-0 bg-transparent  transition-colors duration-300 group-hover:bg-black/40"
        >
          {/* Button */}
          <RoundedButton className="absolute top-2 right-2 opacity-0 translate-y-[-20px] transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            Lưu
          </RoundedButton>
          <div className="absolute flex gap-x-2 right-2 bottom-2 opacity-0 translate-y-[20px] transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 ">
            <RoundedButton className="!rounded-full !min-w-0 !bg-white !w-7 !h-7 !text-black !p-0 !text-[16px]">
              <FaFileUpload />
            </RoundedButton>
            <Popover placement="bottom">
              <PopoverTrigger>
                <Button className="  !rounded-full !relative !min-w-0 !bg-white !w-7 !h-7 !text-black !p-0 !text-[16px]">
                  <IoIosMore />
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <ContextMenu imgUrl={image[0].url} />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
      <div className="px-2">
        <h1 className=" font-sf-medium truncate my-1  ">{name}</h1>
        <div className=" flex items-center">
          {user.avatar ? (
            <Avatar
              className=" mr-2 w-8 h-8"
              {...(user.avatar
                ? { src: user.avatar }
                : { name: user.full_name })}
            />
          ) : (
            <Avatar className=" mr-2 w-8 h-8" name={user.full_name} />
          )}
          <Tooltip
            className="bg-black text-white"
            content={user.full_name}
            placement="bottom"
          >
            <button>
              <LiItemHaveABlackBorder>{user.username}</LiItemHaveABlackBorder>
            </button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}
