import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { SetStateAction } from "react";
import { MdMoreHoriz } from "react-icons/md";
interface IProps {
  imgUrl: string;
  index: number;
  setListImage: React.Dispatch<SetStateAction<{ imgUrl: string }[]>>;
}
export default function ImageListItem({ imgUrl, index, setListImage }: IProps) {
  return (
    <div className=" flex mb-6 rounded-l-lg   group hover:bg-gray-200  justify-between items-center">
      <div className=" flex items-center  gap-x-5">
        <img
          className=" w-[72px] h-[72px] object-cover rounded-lg "
          src={imgUrl}
          alt=""
        />
        <p className=" text-[12px]">30 ngày đến khi hết hạn</p>
      </div>
      <Dropdown>
        <DropdownTrigger>
          <button className="  group-hover:bg-gray-200  group-hover:flex  transition-all duration-500 justify-center items-center text-[20px] rounded-full bg-white hover:bg-gray-300 w-12 h-12">
            <MdMoreHoriz />
          </button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions">
          <DropdownItem
            onClick={() => {
              setListImage((prew) => prew.filter((_, i) => i !== index));
            }}
            key="delete"
            className="text-danger"
            color="danger"
          >
            Xoá
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
