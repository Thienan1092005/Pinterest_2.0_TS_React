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
  Spinner,
  Tooltip,
} from "@nextui-org/react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { getSavedImageApi, savedImageApi } from "@/apis/mediaApi";
import { selectAuth } from "@/redux/slices/authSlice";
import { useSelector } from "react-redux";
import { useCallback, useState } from "react";
import classNames from "classnames";

interface IProps {
  mediaData: MediaItemType;
}

export default function MediaItem({ mediaData }: IProps) {
  const navigate = useNavigate();
  const { currentUser } = useSelector(selectAuth);
  const { image, user, name, slug, id } = mediaData;
  const [imageSaved, setImageSaved] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [dataFetched, setDataFetched] = useState<boolean>(false);
  const handleFollow = async () => {
    try {
      setIsLoading(true);
      if (!id) return;
      await savedImageApi(+id, currentUser?.accessToken);
      setImageSaved((prev) => !prev);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchFollowState = useCallback(async () => {
    if (!currentUser || !id || dataFetched) return;
    try {
      const data = await getSavedImageApi(currentUser.accessToken, +id);
      if (data.length > 0) setImageSaved(true);
      setDataFetched(true);
    } catch (error) {
      console.log(error);
    }
  }, [currentUser, id, dataFetched]);

  return (
    <div onMouseEnter={fetchFollowState}>
      <div className="relative cursor-zoom-in w-full">
        <Image
          loading="lazy"
          className="rounded-[20px] w-full min-h-[100px] z-10"
          src={image[0].url}
          alt={image[0].img_name}
        />
        <div className="group absolute top-0 left-0 w-full h-full">
          <Link to={`/pin/${id}/${encodeURIComponent(slug)}`}>
            <div className="absolute z-10 rounded-[20px] w-full h-full top-0 left-0 bg-transparent transition-colors duration-300 group-hover:bg-black/40"></div>
          </Link>
          <RoundedButton
            disabled={isLoading}
            onClick={handleFollow}
            className={classNames(
              "absolute !z-[11] top-2 right-2 opacity-0 translate-y-[-20px] transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100",
              { "!bg-black": imageSaved }
            )}
          >
            {isLoading ? <Spinner /> : imageSaved ? "Bỏ lưu" : "Lưu"}
          </RoundedButton>
          <div className="absolute flex z-[11] gap-x-2 right-2 bottom-2 opacity-0 translate-y-[20px] transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <RoundedButton className="!rounded-full !min-w-0 !bg-white !w-7 !h-7 !text-black !p-0 !text-[16px]">
              <FaFileUpload />
            </RoundedButton>
            <Popover placement="bottom">
              <PopoverTrigger>
                <Button className="!z-[11] !rounded-full !relative !min-w-0 !bg-white !w-7 !h-7 !text-black !p-0 !text-[16px]">
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
        <h1 className="font-sf-medium truncate my-1">{name}</h1>
        <div className="flex items-center">
          <Avatar
            className="mr-2 w-8 h-8"
            src={user.avatar || undefined}
            name={user.full_name}
          />
          <Tooltip
            className="bg-black text-white"
            content={user.full_name}
            placement="bottom"
          >
            <button
              onClick={() => navigate(`/profile/${user.id}/${user.username}`)}
            >
              <LiItemHaveABlackBorder>{user.username}</LiItemHaveABlackBorder>
            </button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}
