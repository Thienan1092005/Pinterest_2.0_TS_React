import { useContext } from "react";
import { ImageContext } from "@/context/ImageContext";

export const useImageContext = () => {
  const context = useContext(ImageContext);

  if (!context) {
    throw new Error("pleas set you componets to children of t");
  }

  return context;
};
