import React, { useState, createContext, ReactNode, useEffect } from "react";
import { GetCommentsByIdItemtype } from "@/apis/interfaces";
import { useAsync, useToggle } from "@smojs/react-hooks";
import { useParams } from "react-router";
import { getCommentsByImageIdApi } from "@/apis/mediaApi";

interface CreateComment {
  isCreating: boolean;
  reply: {
    isReply: boolean;
    replyToId: number;
    replyToUser: string;
  };
  content: string;
  commentToPinId: number;
}
interface CommentContextType {
  commentList: GetCommentsByIdItemtype[] | null;
  setCommentList: React.Dispatch<
    React.SetStateAction<GetCommentsByIdItemtype[] | null>
  >;
  isLoading: boolean;
  error: Error | null;
  toggleReFetch: (value?: boolean | undefined) => void;
  createComment: CreateComment;
  setCreateComment: React.Dispatch<React.SetStateAction<CreateComment>>;
}

export const CommentContext = createContext<CommentContextType | undefined>(
  undefined
);

const CommentContextProvider = ({ children }: { children: ReactNode }) => {
  const [isReFetch, toggleReFetch] = useToggle();
  const [createComment, setCreateComment] = useState<CreateComment>({
    isCreating: false,
    reply: {
      isReply: false,
      replyToId: 0,
      replyToUser: "",
    },
    content: "",
    commentToPinId: 0,
  });
  const [commentList, setCommentList] = useState<
    GetCommentsByIdItemtype[] | null
  >(null);
  const { id } = useParams();

  const fetchComments = async () => {
    if (!id) return null;
    const response = await getCommentsByImageIdApi(+id);
    return response;
  };

  const { data, error, isLoading } = useAsync(fetchComments, [id, isReFetch]);

  useEffect(() => {
    if (!data) return;
    setCommentList(data?.data.items || null);
  }, [data]);

  return (
    <CommentContext.Provider
      value={{
        commentList: commentList || null,
        setCommentList,
        isLoading,
        error,
        toggleReFetch,
        createComment,
        setCreateComment,
      }}
    >
      {children}
    </CommentContext.Provider>
  );
};

export default CommentContextProvider;
export type { CommentContextType };
