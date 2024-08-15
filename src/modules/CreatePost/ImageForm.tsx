import { createMediaUploadApi } from "@/apis/mediaApi";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { SubmitHandler, useForm, UseFormRegisterReturn } from "react-hook-form";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useNavigate } from "react-router";

interface IProps {
  toggleLoading: (value?: boolean | undefined) => void;
}

export interface ImageFormRefs {
  submitRef?: HTMLButtonElement | null;
  selectImageRef?: HTMLInputElement | null;
}

export default forwardRef<ImageFormRefs, IProps>(function ImageForm(
  { toggleLoading },
  ref
) {
  const submitRef = useRef<HTMLButtonElement>(null);
  const selectImageRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    submitRef: submitRef.current,
  }));

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const navigate = useNavigate();
  const { handleSubmit, register, setValue, watch } = useForm({
    defaultValues: {
      title: "",
      slug: "",
      desc: "",
      files: [],
    },
  });

  const handleUpload: SubmitHandler<{
    title: string;
    slug: string;
    desc: string;
    files: File[];
  }> = async (values, e: React.BaseSyntheticEvent | undefined) => {
    e?.preventDefault();
    console.log(values); // Kiểm tra giá trị của các tham số đầu vào

    if (!values.files || values.files.length === 0) {
      return;
    }

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

  // In giá trị của các trường form
  console.log(watch("files"));

  return (
    <div className="mx-auto bt-1 mt-10 text-center flex justify-center">
      <form
        onSubmit={handleSubmit(handleUpload)}
        className="flex gap-x-10 w-[60%]"
      >
        {previewImage ? (
          <div className="w-[600px]">
            <img
              className="w-full h-full rounded-lg object-cover"
              src={previewImage}
              alt=""
            />
          </div>
        ) : (
          <button
            onClick={() => {
              selectImageRef.current?.click();
            }}
          >
            <div className="w-[375px] shrink-0 relative h-[453px] rounded-lg bg-gray-200">
              <div className="text-[16px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mx-auto max-w-[60%]">
                <FaCloudUploadAlt className="mx-auto text-[24px] mb-5" />
                <p>Chọn một tệp hoặc kéo và thả tập ở đây </p>
              </div>
              <p
                className="text-[16px] font-sf-light px-1 absolute bottom-10 cursor-pointer"
                onClick={() => {
                  selectImageRef.current?.click();
                }}
              >
                bạn nên sử dụng tập tin .jpg chất lượng cao có kích thước 20MB
                hoặc tập tin .mp4 chất lượng cao có kích thước dưới 200MB
              </p>
            </div>
          </button>
        )}
        <div className="w-full text-[12px]">
          <CustomInputUploadImage
            labelName="Tiêu đề"
            register={register("title")}
          />
          <label className="mb-2 block text-black/50 text-left ml-1" htmlFor="">
            Mô tả
          </label>
          <textarea
            {...register("desc")}
            placeholder="Thêm mô tả"
            className="w-full mb-4 min-h-[100px] rounded-[25px] p-4 border-1 border-black/50"
          />
          <CustomInputUploadImage
            labelName="Slug"
            register={register("slug")}
          />
        </div>
        <button ref={submitRef} className="hidden">
          Submit
        </button>
        <input
          className="hidden"
          type="file"
          {...register("files", {
            onChange: (e) => {
              setPreviewImage(URL.createObjectURL(e.target.files[0]));
              setValue("files", e.target.files);
            },
          })}
          ref={selectImageRef}
        />
      </form>
    </div>
  );
});

const CustomInputUploadImage = ({
  labelName,
  register,
  ...props
}: {
  labelName: string;
  register?: UseFormRegisterReturn;
}) => {
  return (
    <>
      <label className="mb-2 block text-black/50 text-left ml-1" htmlFor="">
        {labelName}
      </label>
      <input
        placeholder="Thêm slug"
        className="w-full rounded-[25px] mb-5 p-4 border-1 border-black/50"
        type="text"
        {...props}
        {...register}
      />
    </>
  );
};
