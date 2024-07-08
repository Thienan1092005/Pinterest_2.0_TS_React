import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface IPorps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  lableName: string;
  register?: UseFormRegisterReturn;
}

export default function CustomInput({
  className,
  lableName,
  register,
  ...props
}: IPorps) {
  return (
    <div className={`text-black mb-4 text-left ${className}`}>
      <label className=" block pb-2" htmlFor={register?.name}>
        {lableName}
      </label>
      <input
        placeholder="email or username"
        className="focus:border-[2px] px-2 h-[50px] border-ocren-blue outline-none w-full rounded-3xl border-pinter-gray-300  border-[2px] border-black/20"
        type="text"
        {...props}
        {...register}
      />
    </div>
  );
}
