import { selectAuth, setCurrentUser } from "@/redux/slices/authSlice";
import { useSelector } from "react-redux";
import AvatarOrName from "../customUi/AvatarOrName";
import CustomInput from "../customUi/CustomInput";
import RoundedButton from "../customUi/RoundedButton";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Spinner } from "@nextui-org/react";
import classNames from "classnames";
import { userUpdateInfoApi } from "@/apis/userApi";
import { object, string, number } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormErrorMesage from "./FormErrorMesage";

interface IProps {
  onClose: () => void;
}

interface FormValues {
  username: string;
  fullName: string;
  age: number | null;
  email: string;
  password: string;
}

export default function EditUserForm({ onClose }: IProps) {
  const baseMessage = "Bạn đã bỏ lỡ điều gì đó, đừng quên thêm";

  const schemaValidate = object({
    username: string().required(`${baseMessage} username của bạn`),
    password: string()
      .required(`${baseMessage} password của bạn`)
      .min(6, "Password chứa ít nhất 6 ký tự"),
    email: string()
      .required(`${baseMessage} email của bạn`)
      .email("Email không hợp lệ"),
    fullName: string().required(`${baseMessage} full name của bạn`),
    age: number().required(`${baseMessage} tuổi của bạn`).nullable(), // Đảm bảo rằng 'age' có thể là null
  });

  const { currentUser } = useSelector(selectAuth);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      username: currentUser?.username || "",
      fullName: currentUser?.full_name || "",
      age: currentUser?.age ?? null,
      email: currentUser?.email || "",
      password: "",
    },
    resolver: yupResolver(schemaValidate),
    mode: "onBlur",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleEditUserInfo: SubmitHandler<FormValues> = async (
    values: FormValues
  ) => {
    try {
      setIsLoading(true);
      const { data } = await userUpdateInfoApi({
        ...values,
        age: +values.age!,
      });
      onClose();
      dispatch(setCurrentUser(data));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="rounded-3xl pt-[10px] pb-5 px-[10px]">
      <AvatarOrName
        className="w-[100px] h-[100px] text-[40px] mx-auto object-cover"
        src={currentUser?.avatar}
        name={currentUser?.full_name}
      />

      <form
        onSubmit={handleSubmit(handleEditUserInfo)}
        className="w-[80%] mt-5 mx-auto"
      >
        <CustomInput register={register("username")} lableName="Username" />
        <FormErrorMesage message={errors.username?.message} />
        <CustomInput register={register("email")} lableName="Email" />
        <FormErrorMesage message={errors.email?.message} />
        <CustomInput register={register("fullName")} lableName="Fullname" />
        <FormErrorMesage message={errors.fullName?.message} />
        <CustomInput register={register("age")} lableName="Age" />
        <FormErrorMesage message={errors.age?.message} />
        <CustomInput
          register={register("password")}
          type="password"
          lableName="Password"
        />
        <RoundedButton
          disabled={isLoading}
          className={classNames("!w-full", {
            "!bg-black !text-white": isLoading,
          })}
        >
          {isLoading ? <Spinner className="text-white" /> : "Update"}
        </RoundedButton>
      </form>
    </div>
  );
}
