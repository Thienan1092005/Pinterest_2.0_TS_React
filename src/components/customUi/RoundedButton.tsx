import { forwardRef } from "react";

interface IProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export default forwardRef(function RoundedButton(
  { children, className, onClick, ...props }: IProps,
  ref: React.Ref<HTMLButtonElement> | null
) {
  return (
    <button
      onClick={onClick}
      ref={ref}
      className={`px-3 flex  items-center justify-center   py-2 text-white font-[600] min-w-[50px] cursor-pointer rounded-[20px] bg-primary-red-color ${className}`}
      {...props}
    >
      {children}
    </button>
  );
});
