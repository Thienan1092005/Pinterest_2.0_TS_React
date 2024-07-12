import { CommentContext } from "@/context/commentContext";
import { useContext } from "react";

export const useCommentContext = () => {
  const context = useContext(CommentContext);
  if (!context) {
    throw new Error("vui lòng bọc nội dung trong provider");
  } else {
    return context;
  }
};
