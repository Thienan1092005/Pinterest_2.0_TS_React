import RoundedButton from "./RoundedButton";

interface IProps {
  title: string;
  content: string;
  titleColor?: string;
  contentColor?: string;
  lineWhidth?: string;
  themeColor?: string;
}

export default function SortContent({
  title,
  content,
  titleColor,
  contentColor,
  lineWhidth,
  themeColor,
}: IProps) {
  return (
    <div className={`  text-center items-center  text-[${themeColor}]  `}>
      <h1
        className={`  font-sf-bold  text-[60px] text-center !max-w-[${lineWhidth}] ${titleColor}`}
      >
        {title}
      </h1>
      <p
        className={` mx-auto my-5 font-sf-light   text-[24px] max-w-[380px] text-center ${contentColor}`}
      >
        {content}
      </p>
      <RoundedButton>Khám Phá</RoundedButton>
    </div>
  );
}
