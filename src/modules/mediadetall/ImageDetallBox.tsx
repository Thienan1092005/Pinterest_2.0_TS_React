import CommentContextProvider from "@/context/commentContext";
import ImagePost from "./ImagePost";
import ImagePrevew from "./ImagePrevew";

export default function ImageDetallBox() {
  return (
    <div className=" rounded-[25px] flex justify-between  max-h-[83vh]  w-[1200px]  shadow-custom-yuki overflow-hidden  mx-auto   bg-white ">
      <ImagePrevew />
      <CommentContextProvider>
        <ImagePost />
      </CommentContextProvider>
    </div>
  );
}
