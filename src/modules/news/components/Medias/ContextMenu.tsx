import ShortTextHaveGrayHover from "@/components/customUi/ShortTextHaveGrayHover";
interface IProps {
  className?: string;
  imgUrl: string;
}

interface ContextItemType {
  title: string;
  onClick?: () => void;
}

export default function ContextMenu({ className, imgUrl }: IProps) {
  const handleOpenImage = () => {
    window.open(imgUrl, "_blank");
  };

  const listFunc: ContextItemType[] = [
    { title: "Ẩn ghim" },
    {
      title: "Tải hình ảnh xuống",
      onClick: handleOpenImage,
    },
    { title: "Báo cáo ghim" },
  ];
  return (
    <div
      className={` z-10 py-4 w-[220px] shadow-md px-1 bg-white rounded-lg  ${className}`}
    >
      <h1 className=" font-sf-light  mb-[15px] max-w-[300px] ">
        Ghim này lấy cảm hứng từ hoạt động gần đây của bạn
      </h1>
      {listFunc.map((item, i) => (
        <ShortTextHaveGrayHover key={i} onClick={item.onClick}>
          {item.title}
        </ShortTextHaveGrayHover>
      ))}
    </div>
  );
}
