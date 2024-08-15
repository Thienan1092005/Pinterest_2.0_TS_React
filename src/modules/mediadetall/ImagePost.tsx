import { TiHeartOutline } from "react-icons/ti";
import { MdMoreHoriz, MdOutlineFileUpload } from "react-icons/md";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Modal,
  ModalContent,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import RoundedButton from "@/components/customUi/RoundedButton";
import AvatarOrName from "@/components/customUi/AvatarOrName";
import { useImageContext } from "@/hooks/useImageContext";
import InputCommentBox from "./InputCommentBox";
import ImageComments from "./ImageComments";
import { useParams, useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { getSavedImageApi, RemovePost, savedImageApi } from "@/apis/mediaApi";
import cn from "classnames";
import LoginForm from "@/components/formSystem/LoginForm";
import { useToggle } from "@smojs/react-hooks";
import LoadingSpinner from "@/components/LoadingSpinner";
import LiItemHaveABlackBorder from "@/components/customUi/LiItemHaveABlackBorder";
export default function ImagePost() {
  const { imageData } = useImageContext();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { currentUser } = useSelector((state: RootState) => state.auth);
  const [imageSaved, setImageSaved] = useState<boolean>(false);
  const [isSaving, toggleSaving] = useToggle(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const listBtn = [
    { item: <TiHeartOutline /> },
    { item: <MdOutlineFileUpload /> },
  ];

  const handleFollow = async () => {
    try {
      toggleSaving(true);
      if (!id) return;
      await savedImageApi(+id, currentUser?.accessToken);
      setImageSaved((prev) => !prev);
    } catch (error) {
      console.log(error);
    } finally {
      toggleSaving(false);
    }
  };
  useEffect(() => {
    if (!currentUser || !id) return;
    const getFollowState = async () => {
      try {
        const data = await getSavedImageApi(currentUser.accessToken, +id);
        if (data.length > 0) setImageSaved(true);
      } catch (error) {
        console.log(error);
      }
    };
    getFollowState();
  }, [id, currentUser]);

  if (!imageData) return null;

  const { user, name, description, id: imageId } = imageData;
  const { full_name, avatar, id: creatorId } = user;

  const handleDeleteImg = async () => {
    try {
      await RemovePost(+imageId);
      navigate("/news");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex-1 flex flex-col w-full p-5 h-full">
      <div className="flex  justify-between w-full">
        <div className="flex">
          {listBtn.map((item, i) => (
            <button
              key={i}
              className="flex transition-all duration-500 justify-center items-center text-[20px] rounded-full bg-white hover:bg-gray-300 w-12 h-12"
            >
              {item.item}
            </button>
          ))}
          {+creatorId == currentUser?.id && (
            <Dropdown>
              <DropdownTrigger>
                <button className="flex transition-all duration-500 justify-center items-center text-[20px] rounded-full bg-white hover:bg-gray-300 w-12 h-12">
                  <MdMoreHoriz />
                </button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Static Actions">
                <DropdownItem
                  onClick={() => {
                    handleDeleteImg();
                  }}
                  key="delete"
                  className="text-danger"
                  color="danger"
                >
                  Xoá Ghim
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          )}
        </div>
        <div className="flex gap-x-5 items-center">
          <Dropdown>
            <DropdownTrigger>
              <Button>Hồ sơ</Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              <DropdownItem key="new">New file</DropdownItem>
              <DropdownItem key="copy">Copy link</DropdownItem>
              <DropdownItem key="edit">Edit file</DropdownItem>
              <DropdownItem key="delete" className="text-danger" color="danger">
                Delete file
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          {currentUser ? (
            <RoundedButton
              onClick={handleFollow}
              className={cn("bg-primary-red-color text-white", {
                "!bg-black !text-white": imageSaved,
              })}
              disabled={isSaving}
            >
              {isSaving ? (
                <LoadingSpinner color="white" size="sm" />
              ) : imageSaved ? (
                "Bỏ Lưu"
              ) : (
                "Lưu"
              )}
            </RoundedButton>
          ) : (
            <Button
              onPress={onOpen}
              className={cn("bg-primary-red-color   text-white", {
                "!bg-black !text-white": imageSaved,
              })}
            >
              Lưu
            </Button>
          )}
        </div>
      </div>
      <div className="flex-1 max-h-full  max-w-full overflow-x-hidden overflow-y-auto">
        <h1 className="my-[15px] text-[30px] font-sf-bold">{name}</h1>
        <p className="mb-5 max-w-[90%] font-sf-regular text-[16px]">
          {description}
        </p>
        <div className="flex justify-between w-full">
          <div className="flex gap-x-4 items-center font-sf-regular">
            <AvatarOrName size="md" src={avatar} fullName={full_name} />
            <div>
              <h1 className=" font-sf-bold">{full_name}</h1>
              <Tooltip
                className="bg-black text-white"
                content={user.full_name}
                placement="bottom"
              >
                <button
                  onClick={() =>
                    navigate(`/profile/${user.id}/${user.username}`)
                  }
                >
                  <LiItemHaveABlackBorder>
                    {user.username}
                  </LiItemHaveABlackBorder>
                </button>
              </Tooltip>
            </div>
          </div>
          <Button
            className={cn(
              "!bg-pinter-gray  !transition-color duration-300 hover:!text-white hover:!bg-primary-red-color !text-black"
            )}
          >
            Theo dõi
          </Button>
          <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
              {(onclose) => <LoginForm onclose={onclose} />}
            </ModalContent>
          </Modal>
        </div>
        <ImageComments />
      </div>
      {!currentUser ? (
        <h1 className=" w-full text-center font-sf-bold">
          Đăng Nhập để bình luận
        </h1>
      ) : (
        <InputCommentBox />
      )}
    </div>
  );
}
