import { MediaDetailResponseType } from "@/apis/interfaces";
import React, { createContext, useState, ReactNode } from "react";

interface ImageContextType {
  imageData: MediaDetailResponseType | undefined;
  setImageData: React.Dispatch<
    React.SetStateAction<MediaDetailResponseType | undefined>
  >;
}

export const ImageContext = createContext<ImageContextType | undefined>(
  undefined
);

interface ImageContextProviderProps {
  children: ReactNode;
}

const ImageContextProvider: React.FC<ImageContextProviderProps> = ({
  children,
}) => {
  const [imageData, setImageData] = useState<
    MediaDetailResponseType | undefined
  >(undefined);

  return (
    <ImageContext.Provider value={{ imageData, setImageData }}>
      {children}
    </ImageContext.Provider>
  );
};

export default ImageContextProvider;
export type { ImageContextType };
