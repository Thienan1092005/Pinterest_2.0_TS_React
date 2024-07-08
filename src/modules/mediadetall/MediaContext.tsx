import ImageContextProvider from "@/context/ImageContext";
import MediaDetall from "./MediaDetall";

export default function MediaContext() {
  return (
    <ImageContextProvider>
      <MediaDetall></MediaDetall>
    </ImageContextProvider>
  );
}
