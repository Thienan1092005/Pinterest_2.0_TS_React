import React, { useState, createContext, ReactNode, useEffect } from "react";
import { GetCommentsByIdItemtype } from "@/apis/interfaces";
import { useAsync, useToggle } from "@smojs/react-hooks";
import { useParams } from "react-router";
import { getCommentsByImageIdApi } from "@/apis/mediaApi";

interface CommentContextType {
  commentList: GetCommentsByIdItemtype[] | null;
  setCommentList: React.Dispatch<
    React.SetStateAction<GetCommentsByIdItemtype[] | null>
  >;
  isLoading: boolean;
  error: Error | null;
  toggleReFetch: (value?: boolean | undefined) => void;
  replyTarget: { userTargetName: string; userTargetId: number } | undefined;
  setReplyTarget: React.Dispatch<
    React.SetStateAction<
      { userTargetName: string; userTargetId: number } | undefined
    >
  >;
}

export const CommentContext = createContext<CommentContextType | undefined>(
  undefined
);

const CommentContextProvider = ({ children }: { children: ReactNode }) => {
  const [isReFetch, toggleReFetch] = useToggle();
  const [replyTarget, setReplyTarget] = useState<
    { userTargetName: string; userTargetId: number } | undefined
  >();
  const [commentList, setCommentList] = useState<
    GetCommentsByIdItemtype[] | null
  >(null);
  const { id } = useParams();

  const fetchComments = async () => {
    if (!id) return null;
    return getCommentsByImageIdApi(+id);
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data, error, isLoading } = useAsync(fetchComments, [id, isReFetch]);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
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
        replyTarget,
        setReplyTarget,
      }}
    >
      {children}
    </CommentContext.Provider>
  );
};

export default CommentContextProvider;
export type { CommentContextType };
