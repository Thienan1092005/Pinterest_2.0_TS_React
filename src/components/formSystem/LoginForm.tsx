import { FaPinterest } from "react-icons/fa";
import CustomInput from "../customUi/CustomInput";
import { Button } from "@nextui-org/react";
import RoundedButton from "../customUi/RoundedButton";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { handleLoginThunk } from "@/redux/slices/authSlice";
import { AppDispatch } from "@/redux/store";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormErrorMesage from "./FormErrorMesage";

interface IPoprs {
  onclose?: () => void;
}
interface IFormValues {
  username: string;
  password: string;
}

const schemaValidate = object({
  username: string()
    .required("Username khong duoc trong")
    .min(6, "Username 6 ki tu tro len"),
  password: string()
    .required("mật khẩu không đc trống")
    .min(8, "mật khẩu chứa tối thiểu 8 ký tự"),
});

export default function LoginForm({ onclose }: IPoprs) {
  const dispatch = useDispatch<AppDispatch>();
  const { slug } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: yupResolver(schemaValidate),
    mode: "onBlur",
  });
  const handleLogin = async (values: IFormValues) => {
    try {
      await dispatch(handleLoginThunk(values)).unwrap();
      toast.success("Login success");
      onclose && onclose();
      if (!slug) navigate("/news");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.message || "Lỗi không xác định");
    }
  };
  return (
    <div className="  text-center rounded-3xl py-5 px-[10px]  bg-white">
      <div>
        <FaPinterest className="text-[24px] mb-5 w-full text-primary-red-color mr-1" />
        <h1 className=" my-5 font-sf-bold text-[32px]">
          Chào mừng bạn đến với Yukiterest
        </h1>
      </div>
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="w-[70%] px-10 mx-auto h-full text-center"
      >
        {/* <input type="text" {...register("username")} /> */}
        <CustomInput register={register("username")} lableName="Username" />
        {errors.username?.message && (
          <FormErrorMesage message={errors.username.message} />
        )}
        <CustomInput
          register={register("password")}
          lableName="Password"
          type="password"
          name="password"
        />
        {errors.password?.message && (
          <FormErrorMesage message={errors.password.message} />
        )}
        <Button className=" block my-5  bg-white w-auot h-auto p-0">
          Quên mật khẩu
        </Button>
        <RoundedButton className=" w-full">Đăng nhập</RoundedButton>
      </form>
    </div>
  );
}
