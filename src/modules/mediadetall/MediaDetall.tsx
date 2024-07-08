import { useNavigate, useParams } from "react-router";
import MediaList from "../news/components/Medias/MediaList";
import { useEffect, useState } from "react";
import ImageDetailBox from "./ImageDetallBox";
import { getImageDetailById } from "@/apis/mediaApi";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Button } from "@nextui-org/react";
import { IoArrowBackOutline } from "react-icons/io5";
import { useImageContext } from "@/hooks/useImageContext";

export default function MediaDetall() {
  const { slug, id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { imageData, setImageData } = useImageContext();
  useEffect(() => {
    scroll({ top: 0, behavior: "smooth" });
  }, [slug]);
  useEffect(() => {
    const getImgDetailBySlug = async () => {
      try {
        if (!id || !slug) {
          navigate("/news");
          return;
        }
        setIsLoading(true);
        const data = await getImageDetailById(+id);
        setImageData(data);
      } catch (error) {
        navigate("/news");
      } finally {
        setIsLoading(false);
      }
    };
    getImgDetailBySlug();
  }, [id, navigate, setImageData, slug]);
  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className=" px-10 pt-2 relative ">
          <Button
            onClick={() => {
              navigate(-1);
            }}
            className="left-10 font-bold text-3xl bg-white top-2 text-black"
          >
            <IoArrowBackOutline />
          </Button>
          {imageData && (
            <div className=" flex justify-around">
              <ImageDetailBox />
            </div>
          )}
          <div>
            <h1 className="  text-center py-5">Thêm nội dung để khám phá</h1>
            <MediaList />
          </div>
        </div>
      )}
    </>
  );
}
