import { useImageContext } from "@/hooks/useImageContext";
import { Image } from "@nextui-org/react";
import { Navigate } from "react-router";
import useEmblaCarousel from "embla-carousel-react";
import style from "./style.module.css";
import cn from "classnames";

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
                "h-full !rounded-l-[25px] !rounded-r-none overflow-hidden",
                style.embla__slide
              )}
            >
              <Image
                loading="lazy"
                classNames={{
                  wrapper: " w-full !max-w-full mx-auto ",
                }}
                className={cn(
                  " !w-full rounded-none !h-full max-h-[80vh] object-fill",
                  style.embla__slide__number
                )}
                src={image.url}
                alt={image.img_name}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
