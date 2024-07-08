interface IProps {
  img: string;
  content: string;
  children?: React.ReactNode;
  className?: string;
  fontSize?: string;
}

export default function ImgHaveTextIner({
  img,
  content,
  children,
  className,
  fontSize,
}: IProps) {
  const dynamicFontSize = fontSize ? `text-[${fontSize}px]` : "text-[56px]";

  return (
    <div className={` relative w-[400px] h-[420px] ${className}`}>
      <img
        className="absolute object-cover w-full h-full left-0 top-0"
        src={img}
        alt=""
      />
      <div className="absolute bottom-[20px] w-full flex justify-center items-center left-1/2 -translate-x-1/2">
        <div className=" ml-[30px]">
          <h1
            className={`${dynamicFontSize} text-white max-w-[60%] font-sf-medium`}
          >
            {content}
          </h1>
          {children}
        </div>
      </div>
    </div>
  );
}
