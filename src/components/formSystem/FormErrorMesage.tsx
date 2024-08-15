import { IoIosWarning } from "react-icons/io";

export default function FormErrorMesage({ message }: { message?: string }) {
  return (
    message && (
      <div className=" flex  text-danger-400 items-center ">
        <IoIosWarning />
        <p>{message}</p>
      </div>
    )
  );
}
