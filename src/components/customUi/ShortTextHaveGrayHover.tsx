export default function ShortTextHaveGrayHover({
  children,
  onClick,
}: {
  children: string;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className=" hover:bg-[#e9e9e9] font-sf-regular rounded-md  w-full   cursor-pointer p-1 hover:bg-hover-color  my-1  text-black "
    >
      <h1>{children}</h1>
    </div>
  );
}
