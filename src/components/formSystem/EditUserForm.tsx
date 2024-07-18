import { selectAuth } from "@/redux/slices/authSlice";
import { useSelector } from "react-redux";
import AvatarOrName from "../customUi/AvatarOrName";
import CustomInput from "../customUi/CustomInput";
import RoundedButton from "../customUi/RoundedButton";
import { useForm } from "react-hook-form";

export default function EditUserForm() {
  const { register } = useForm({
    defaultValues: {
      username: "",
      fullName: "",
      age: "",
      email: " ",
      password: " ",
    },
  });
  const { currentUser } = useSelector(selectAuth);
  return (
    <div className="rounded-3xl pt-[10px] pb-5 px-[10px]">
      <AvatarOrName
        className=" w-[100px] h-[100px] text-[40px] mx-auto object-cover"
        src={currentUser?.avatar}
        name={currentUser?.full_name}
      />
      <form className=" w-[80%] mt-5 mx-auto ">
        <CustomInput register={register("username")} lableName="Username" />
        <CustomInput register={register("email")} lableName="Email" />
        <CustomInput register={register("fullName")} lableName="Fullname" />
        <CustomInput register={register("age")} lableName="Age" />
        <CustomInput
          register={register("password")}
          type="password"
          lableName="Password"
        />
        <RoundedButton className=" !w-full">Update</RoundedButton>
      </form>
    </div>
  );
}
