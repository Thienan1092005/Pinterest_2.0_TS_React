import { FaPinterest } from "react-icons/fa6";
import CustomInput from "../customUi/CustomInput";
import { useForm } from "react-hook-form";
import RoundedButton from "../customUi/RoundedButton";
import { useDispatch } from "react-redux";
import { handleRegisterThunk } from "@/redux/slices/authSlice";
import { AppDispatch } from "@/redux/store";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";
import { object, string, number } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormErrorMesage from "./FormErrorMesage";
interface IFormValue {
  username: string;
  password: string;
  email: string;
  fullName: string;
  age: number | null;
}

export default function SignupForm() {
  const { slug } = useParams();
  const Navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const baseMessage = "Bạn đã bỏ lở điều gì đó , đừng quên thêm  ";
  const schemaValidate = object({
    username: string().required(`${baseMessage} username của bạn`),
    password: string()
      .required(`${baseMessage} password của bạn`)
      .min(6, "Password chứa ít nhất 6 ký tự"),
    email: string()
      .required(`${baseMessage} email của bạn`)
      .email("email không  hợp lệ "),
    fullName: string().required(`${baseMessage} fullName của bạn`),
    age: number().required(`${baseMessage} tuổi của bạn`),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
      email: "",
      fullName: "",
      age: undefined,
    },
    resolver: yupResolver(schemaValidate),
    mode: "onSubmit",
  });

  const handleRegister = async (value: IFormValue) => {
    const ageValue = Number(value.age);
    value.age = (Number.isNaN(ageValue) ? null : ageValue) as number | null;

    try {
      console.log(value);
      if (value.age === null) {
        throw new Error("Invalid age value");
      }
      await dispatch(handleRegisterThunk(value)).unwrap();
      toast.success("Login success");
      if (!slug) Navigate("/news");
    } catch (error) {
      console.log(error);
      toast.error("An error occurred during registration");
    }
  };

  return (
    <div className="rounded-3xl pt-[10px]  pb-5 px-[10px] bg-white">
      <FaPinterest className="mx-auto text-primary-red-color text-[24px]" />
      <h1 className="text-center mx-auto max-w-[80%] my-5 font-sf-regular text-[32px]">
        Chào mừng bạn đến với Yukiterest
      </h1>
      <p className="text-center">Tìm những ý tưởng mới để thử</p>
      <div className="w-full mt-[15px] mx-auto">
        <form onSubmit={handleSubmit(handleRegister)}>
          <div>
            <CustomInput
              register={register("username")}
              lableName="Tên nghười dùng"
            />
            <FormErrorMesage message={errors.username?.message} />
          </div>
          <div>
            <CustomInput register={register("email")} lableName="Email" />
            <FormErrorMesage message={errors.email?.message} />
          </div>

          <div>
            <CustomInput register={register("age")} lableName="Tuổi" />
            <FormErrorMesage message={errors.age?.message} />
          </div>
          <div>
            <CustomInput
              register={register("fullName")}
              lableName="Họ và tên"
            />
            <FormErrorMesage message={errors.fullName?.message} />
          </div>

          <div>
            <CustomInput
              type="password"
              register={register("password")}
              lableName="Mật khẩu"
            />
            <FormErrorMesage message={errors.password?.message} />
          </div>
          <div>
            <CustomInput
              type="password"
              register={register("password")}
              lableName="Nhập lại mật khẩu"
            />
            <FormErrorMesage message={errors.email?.message} />
          </div>

          <RoundedButton className="my-5 w-full">Đăng Ký</RoundedButton>
        </form>
      </div>
    </div>
  );
}
