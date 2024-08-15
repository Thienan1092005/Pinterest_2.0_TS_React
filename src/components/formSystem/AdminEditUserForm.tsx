import AvatarOrName from "../customUi/AvatarOrName";
import CustomInput from "../customUi/CustomInput";
import RoundedButton from "../customUi/RoundedButton";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { Select, SelectItem, Spinner } from "@nextui-org/react";
import classNames from "classnames";
import { User as UserItem } from "@/apis/interfaces"; // dùng as để đổi tên import
import { AdminEditUserApi } from "@/apis/userApi";
import { useQueryClient } from "@tanstack/react-query";
import { string, object } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormErrorMesage from "./FormErrorMesage";
export interface FormValues {
  username: string;
  password: string;
  email: string;
  fullName: string;
  age: string;
  type: string;
  is_ban: string;
}

interface IProps {
  onClose: () => void;
  userInfo: UserItem | null;
}
export default function AdminEditUserForm({ onClose, userInfo }: IProps) {
  const queryClient = useQueryClient();
  const baseMessage = "Bạn đã bỏ lỡ điều gì đó, đừng quên thêm ";

  const schemaValidate = object({
    username: string().required(`${baseMessage} username của bạn`),
    password: string()
      .required(`${baseMessage} password của bạn`)
      .min(6, "Password chứa ít nhất 6 ký tự"),
    email: string()
      .required(`${baseMessage} email của bạn`)
      .email("Email không hợp lệ"),
    fullName: string().required(`${baseMessage} fullName của bạn`),
    age: string().required(`${baseMessage} tuổi của bạn`),
    is_ban: string().required("Vui lòng chọn trạng thái cho user này"),
    type: string().required("Vui lòng chọn loại người dùng"),
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      username: userInfo?.username || "",
      fullName: userInfo?.full_name || "",
      age: userInfo?.age ? userInfo.age.toString() : "",
      email: userInfo?.email || "",
      password: userInfo?.password || "",
      is_ban: userInfo?.is_ban?.toString() || "",
      type: userInfo?.user_type?.id?.toString() || "",
    },
    resolver: yupResolver(schemaValidate), // Yup schema validation
    mode: "onBlur",
  });

  const [isLoading, setIsLoading] = useState(false);
  const userTypes = [
    { state: "1", label: "Ban User" },
    { state: "0", label: "Active User" },
  ];
  const handleEditUserInfo: SubmitHandler<FormValues> = async (values) => {
    try {
      if (!userInfo?.id) return;
      setIsLoading(true);
      const newValue = {
        ...values,
        is_ban: Number(values.is_ban), // Chuyển đổi giá trị is_ban thành số
        type: Number(values.type),
        age: Number(values.age),
      };
      await AdminEditUserApi(userInfo?.id, newValue);
      queryClient.invalidateQueries();
      onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleSelectChange = (value: string) => {
    setValue("is_ban", value);
  };
  return (
    <div className="rounded-3xl pt-[10px] pb-5 px-[10px]">
      <AvatarOrName
        className="w-[100px] h-[100px] text-[40px] mx-auto object-cover"
        src={userInfo?.avatar}
        name={userInfo?.full_name}
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
        <FormErrorMesage message={errors.password?.message} />
        <Select
          variant="flat"
          label="Account Status"
          placeholder="Select account status"
          className="my-4"
          value={watch("is_ban")}
          onChange={(e) => handleSelectChange(e.target.value)}
        >
          {userTypes.map((type) => (
            <SelectItem key={type.state} value={type.state}>
              {type.label}
            </SelectItem>
          ))}
        </Select>

        <FormErrorMesage message={errors.is_ban?.message} />
        <CustomInput
          placeholder="Select 1 for admin, 0 for user"
          register={register("type")}
          lableName="Type Status"
        />
        <FormErrorMesage message={errors.type?.message} />
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
