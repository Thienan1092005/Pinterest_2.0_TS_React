import { useImageContext } from "@/hooks/useImageContext";
import { Button, Image } from "@nextui-org/react";
import { Navigate } from "react-router";
import useEmblaCarousel from "embla-carousel-react";
import style from "./style.module.css";
import cn from "classnames";
import { Link } from "react-router-dom";

export default function ImagePrevew() {
  const { imageData } = useImageContext();
  const [emblaRef] = useEmblaCarousel();

  if (!imageData) {
    return <Navigate to="/news" />;
  }
  const { image: images } = imageData;
  return (
    <div
      className={cn(
        " w-[600px] relative max-w-full h-auto max-h-[80vh] ",
        style.embla
      )}
    >
      <div className={cn("h-full", style.embla__viewport)} ref={emblaRef}>
        <div className={cn("h-full", style.embla__container)}>
          {images.map((image) => (
            <div
              key={image.id}
              className={cn(
                "!h-full !rounded-l-[25px] !relative !rounded-r-none overflow-hidden my-auto",
                style.embla__slide
              )}
            >
              <div className="relative flex-col !h-full justify-center items-center  w-full mx-auto">
                <Image
                  loading="lazy"
                  classNames={{
                    wrapper: "!w-full !max-w-full mx-auto !h-full ",
                  }}
                  className={cn(
                    "!w-full rounded-none !h-full max-h-[80vh] object-cover ",
                    style.embla__slide__number
                  )}
                  src={image.url}
                  alt={image.img_name}
                />
                <Link to={image.url} target="_blank">
                  <Button className=" z-50 absolute bottom-5 left-10">
                    Xem hình ảnh
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
