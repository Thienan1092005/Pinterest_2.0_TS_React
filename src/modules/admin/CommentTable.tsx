import { GetCommentsByIdItemtype } from "@/apis/interfaces";
import { adminDeleteCommentApi } from "@/apis/mediaApi";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
  User,
} from "@nextui-org/react";
import { useQueryClient } from "@tanstack/react-query";
import { MdDelete } from "react-icons/md";

export default function CommentTable({
  comments,
  searchComment,
}: {
  comments?: GetCommentsByIdItemtype[];
  searchComment: string;
}) {
  const queryClient = useQueryClient();
  const handleDeleteComment = async (id: number) => {
    try {
      await adminDeleteCommentApi(id);
      queryClient.invalidateQueries();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    comments && (
      <Table
        isStriped
        classNames={{
          base: "text-[20px] font-sf-bold",
        }}
        aria-label="Example static collection table"
      >
        <TableHeader>
          <TableColumn>ID</TableColumn>
          <TableColumn>User</TableColumn>
          <TableColumn>Comment</TableColumn>
          <TableColumn>Reply to id </TableColumn>
          <TableColumn>Funtions</TableColumn>
        </TableHeader>
        <TableBody
          emptyContent={
            searchComment == ""
              ? "nhập id voà ô tìm kiếm phía trên "
              : "id bạn nhập không đúng hoặc id đã bị xoá , kiểm tra lại id của bạn đã nhập"
          }
        >
          {comments?.map(
            (
              { content, id, reply_to, user: { avatar, full_name, username } },
              i
            ) => (
              <TableRow key={i}>
                <TableCell>{id}</TableCell>
                <TableCell>
                  <User
                    classNames={{
                      name: "font-sf-bold",
                      description: "font-sf-medium",
                    }}
                    name={full_name}
                    description={username}
                    avatarProps={{
                      src: avatar,
                    }}
                  />
                </TableCell>
                <TableCell>{content}</TableCell>
                <TableCell>{reply_to || "not reply to any comment"}</TableCell>
                <TableCell>
                  <Tooltip color="danger" content="Delete pin">
                    <button
                      onClick={() => {
                        handleDeleteComment(+id);
                      }}
                      className="bg-transparent !p-0 !m-0 block"
                    >
                      <MdDelete className="text-danger-500 text-[24px]" />
                    </button>
                  </Tooltip>
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    )
  );
}
