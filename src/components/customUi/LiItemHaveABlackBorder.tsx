interface liItemProps {
  children: React.ReactNode;
}
export default function LiItemHaveABlackBorder({ children }: liItemProps) {
  return (
    <li className=" hover:border-b-black list-none	 transition-colors duration-300 border-b-2 border-b-transparent cursor-pointer ">
      {children}
    </li>
  );
}
