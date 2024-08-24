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
  setPage: React.Dispatch<React.SetStateAction<number>>;
  createComment: CreateComment;
  setCreateComment: React.Dispatch<React.SetStateAction<CreateComment>>;
  hasMoreComments: boolean;
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
  const [page, setPage] = useState(1);
  const [hasMoreComments, setHasMoreComments] = useState(true);
  const [commentList, setCommentList] = useState<
    GetCommentsByIdItemtype[] | null
  >(null);
  const { id } = useParams();

  const fetchComments = async () => {
    if (!id) return null;
    const response = await getCommentsByImageIdApi(+id, { page });
    if (response?.data.items.length === 0) setHasMoreComments(false); // Stop if no more comments
    return response;
  };

  const { data, error, isLoading } = useAsync(fetchComments, [
    id,
    page,
    isReFetch,
  ]);

  useEffect(() => {
    if (!data) return;
    setCommentList((prev) => {
      if (!prev) return data?.data.items || null;
      return [...prev, ...data.data.items];
    });
  }, [data]);

  return (
    <CommentContext.Provider
      value={{
        commentList: commentList || null,
        setCommentList,
        isLoading,
        error,
        toggleReFetch,
        setPage,
        createComment,
        setCreateComment,
        hasMoreComments,
      }}
    >
      {children}
    </CommentContext.Provider>
  );
};

export default CommentContextProvider;
export type { CommentContextType };
