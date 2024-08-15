import CustomInput from "../customUi/CustomInput";
import RoundedButton from "../customUi/RoundedButton";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { Select, SelectItem, Spinner } from "@nextui-org/react";
import classNames from "classnames";
import { MediaItemType } from "@/apis/interfaces";
import { useQueryClient } from "@tanstack/react-query";
import { AdminUpdatePinApi } from "@/apis/mediaApi";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormErrorMesage from "./FormErrorMesage";
export interface FormValues {
  name: string;
  slug: string;
  description: string;
  isHidden: string;
}

interface IProps {
  onClose: () => void;
  pinInfo: MediaItemType;
}

export default function AdminEditMedia({ onClose, pinInfo }: IProps) {
  const queryClient = useQueryClient();
  const schemaValidate = object({
    name: string().required("tên không được trống"),
    slug: string().required(),
    description: string().required("description không được trống"),
    isHidden: string().required("vui lòng chọn chế độ hiển thị cho pin này"),
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: pinInfo.name,
      slug: pinInfo.slug,
      description: pinInfo.description,
      isHidden: "",
    },
    resolver: yupResolver(schemaValidate),
    mode: "onBlur",
  });

  const [isLoading, setIsLoading] = useState(false);

  const userTypes = [
    { state: "1", label: "Ẩn pin" },
    { state: "0", label: "Hiện pin" },
  ];

  const handleEditUserInfo: SubmitHandler<FormValues> = async (values) => {
    if (!pinInfo?.id) return;

    setIsLoading(true);
    const newValue = {
      ...values,
      isHidden: Number(values.isHidden),
    };
    console.log(newValue);
    try {
      await AdminUpdatePinApi(newValue, +pinInfo.id);
      queryClient.invalidateQueries();
      onClose();
    } catch (error) {
      console.error("Error updating pin:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleSelectChange = (value: string) => {
    setValue("isHidden", value);
  };
  return (
    <div className="rounded-3xl pt-[10px] pb-5 px-[10px]">
      <form
        onSubmit={handleSubmit(handleEditUserInfo)}
        className="w-[80%] mt-5 mx-auto"
      >
        <CustomInput register={register("name")} lableName="Name" />
        <FormErrorMesage message={errors.name?.message} />
        <CustomInput register={register("slug")} lableName="Slug" />
        <FormErrorMesage message={errors.slug?.message} />
        <CustomInput
          register={register("description")}
          lableName="Description"
        />
        <Select
          variant="flat"
          label="Pin Status"
          placeholder="Select Pin status"
          className="my-4"
          value={watch("isHidden")}
          onChange={(e) => handleSelectChange(e.target.value)}
        >
          {userTypes.map((type) => (
            <SelectItem key={type.state} value={type.state}>
              {type.label}
            </SelectItem>
          ))}
        </Select>
        <FormErrorMesage message={errors.isHidden?.message} />

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
