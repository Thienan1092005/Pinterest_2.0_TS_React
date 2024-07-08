import { GetCommentsByIdItemtype } from "@/apis/interfaces";
import { getCommentsByIdApi } from "@/apis/mediaApi";
import AvatarOrName from "@/components/customUi/AvatarOrName";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

interface IProps {
  comment: GetCommentsByIdItemtype;
}

export default function CommentItem({ comment }: IProps) {
  const { id } = useParams();
  const [commentReply, setCommentReply] = useState<
    GetCommentsByIdItemtype[] | null
  >(null);
  const { content, user, id: commentId } = comment;
  const { avatar, full_name } = user;

  useEffect(() => {
    const getCommentReply = async () => {
      try {
        if (!id || !commentId) return;
        const { data } = await getCommentsByIdApi(+id, { replyTo: +commentId });
        setCommentReply(data.items);
      } catch (error) {
        console.log(error);
      }
    };
    getCommentReply();
  }, [id, commentId]);

  return (
    <div className=" w-full mb-5  ">
      <div className="flex gap-x-2">
        <AvatarOrName size="sm" src={avatar} name={full_name} />
        <div>
          <h1 className="font-sf-bold">{full_name}</h1>
          <p className=" font-sf-light">{content}</p>
        </div>
      </div>
      <div>
        {commentReply &&
          commentReply.map(({ user: { avatar, full_name }, content }) => (
            <div className="flex gap-x-2 pl-10 mt-[10px] ">
              <AvatarOrName size="sm" src={avatar} name={full_name} />
              <div>
                <h1 className="font-sf-bold">{full_name}</h1>
                <p className=" font-sf-light">{content}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
