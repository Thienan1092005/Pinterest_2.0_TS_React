import { createMediaUploadApi } from "@/apis/mediaApi";
import { forwardRef, useRef, useState } from "react";
import { SubmitHandler, useForm, UseFormRegisterReturn } from "react-hook-form";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useNavigate } from "react-router";
interface IProps {
  toggleLoading: (value?: boolean | undefined) => void;
}
export default forwardRef<HTMLButtonElement, IProps>(function ImageForm(
  { toggleLoading },
  ref
) {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const navigate = useNavigate();
  const { handleSubmit, register } = useForm({
    defaultValues: {
      title: "",
      slug: "",
      desc: "",
      files: [],
    },
  });
  const imgInputRef = useRef<HTMLInputElement>(null);
  const handleUpload: SubmitHandler<{
    title: string;
    slug: string;
    desc: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    files: any;
  }> = async (values, e: React.BaseSyntheticEvent | undefined) => {
    e?.preventDefault();
    console.log(values);
    const formData = new FormData();
    formData.append("name", values.title);
    formData.append("slug", values.slug);
    formData.append("description", values.desc);
    formData.append("files", values.files[0]);
    try {
      toggleLoading(true);
      const data = await createMediaUploadApi(formData);
      navigate(`/pin/${data.data.id}/${data.data.slug}`);
    } catch (error) {
      console.log(error);
    } finally {
      toggleLoading(false);
    }
  };
  return (
    <div className=" mx-auto bt-1 mt-10 text-center flex justify-center">
      <form
        onSubmit={handleSubmit(handleUpload)}
        className=" flex gap-x-10 w-[60%] "
      >
        {previewImage ? (
          <div className=" w-[600px]">
            <img
              className=" w-full h-full rounded-lg object-cover"
              src={previewImage}
              alt=""
            />
          </div>
        ) : (
          <button
            onClick={() => {
              imgInputRef.current?.click();
            }}
          >
            <div className="w-[375px] shrink-0  relative h-[453px] rounded-lg   bg-gray-200 ">
              <div className="text-[16px] absolute top-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2 mx-auto max-w-[60%]  ">
                <FaCloudUploadAlt className=" mx-auto text-[24px] mb-5" />
                <p>Chọn một tệp hoặc kéo và thả tập ở đây </p>
              </div>
              <p className="  text-[16px] font-sf-light px-1 absolute bottom-10  ">
                bạn nên sử dụng tập tin .jpg chất lượng cao có kích thước 20MB
                hoặc tập tin .mp4 chất lượng cao có kích thước dưới 200mn
              </p>
            </div>
          </button>
        )}
        <div className="w-full text-[12px]">
          <CustomInputUploadImage
            lableName="Tiêu đề"
            register={register("title")}
          />
          <label
            className=" mb-2 block text-black/50 text-left ml-1 "
            htmlFor=""
          >
            Mô tả
          </label>
          <textarea
            {...register("desc")}
            placeholder="Thêm tiêu đề"
            className=" w-full mb-4 min-h-[100px] rounded-[25px]  p-4 border-1 border-black/50"
          />
          <CustomInputUploadImage
            lableName="Tiêu đề"
            register={register("slug")}
          />
        </div>
        <button ref={ref} className="hidden">
          Submit
        </button>
        <input
          // ref={imgInputRef}
          // className=" invisible"
          type="file"
          {...register("files", {
            onChange: (e) => {
              setPreviewImage(URL.createObjectURL(e.target.files[0]));
            },
          })}
        />
      </form>
    </div>
  );
});

const CustomInputUploadImage = ({
  lableName,
  register,
  ...props
}: {
  lableName: string;
  register?: UseFormRegisterReturn;
}) => {
  return (
    <>
      <label className=" mb-2 block text-black/50 text-left ml-1 " htmlFor="">
        {lableName}
      </label>
      <input
        placeholder="Thêm slug"
        className=" w-full rounded-[25px] mb-5  p-4 border-1 border-black/50"
        type="text"
        {...props}
        {...register}
      />
    </>
  );
};
