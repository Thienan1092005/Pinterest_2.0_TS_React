import { FaPinterest } from "react-icons/fa";
import CustomInput from "../customUi/CustomInput";
import { Button } from "@nextui-org/react";
import RoundedButton from "../customUi/RoundedButton";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { handleLoginThunk } from "@/redux/slices/authSlice";
import { AppDispatch } from "@/redux/store";
import toast from "react-hot-toast";
interface IPoprs {
  onclose?: () => void;
}
interface IFormValues {
  username: string;
  password: string;
}
export default function LoginForm({ onclose }: IPoprs) {
  const dispatch = useDispatch<AppDispatch>();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const handleLogin = async (values: IFormValues) => {
    try {
      await dispatch(handleLoginThunk(values)).unwrap();
      toast.success("Login success");
      onclose && onclose();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.message || "Lỗi không xác định");
    }
  };
  return (
    <div className="  text-center rounded-3xl py-5 px-[10px]  bg-white">
      <div>
        <FaPinterest className="text-[24px] mb-5 w-full text-primary-red-color mr-1" />
        <h1 className=" my-5 font-sf-bold text-3xl">
          Chào mừng bạn đến với Yukiterest
        </h1>
      </div>
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="w-[70%] px-10 mx-auto h-full text-center"
      >
        {/* <input type="text" {...register("username")} /> */}
        <CustomInput register={register("username")} lableName="Username" />
        <CustomInput
          register={register("password")}
          lableName="Password"
          type="password"
          name="password"
        />
        <Button className=" block mb-5  bg-white w-auot h-auto p-0">
          Quên mật khẩu
        </Button>
        <RoundedButton className=" w-full">Đăng nhập</RoundedButton>
      </form>
    </div>
  );
}
