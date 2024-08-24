import { getListImagesApi } from "@/apis/mediaApi";
import {
  Image,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";

export default function CommentManager() {
  const { data: listImageData } = useQuery({
    queryKey: ["listPinData"],
    queryFn: async function () {
      const data = await getListImagesApi();
      return data.items;
    },
    staleTime: 1000 * 60 * 5,
  });
  const navigate = useNavigate();
  return (
    <div className="w-[90%] mx-auto ">
      {listImageData && (
        <Table>
          <TableHeader>
            <TableColumn>ID</TableColumn>
            <TableColumn>IMAGE</TableColumn>
            <TableColumn>CREATER</TableColumn>
          </TableHeader>
          <TableBody>
            {listImageData.map(
              ({ image, id, name, user: { full_name } }, i) => (
                <TableRow
                  key={i}
                  onClick={() => {
                    navigate("pin/" + id);
                  }}
                >
                  <TableCell>
                    <Image width={120} src={image[0].url} />
                  </TableCell>
                  <TableCell>{name}</TableCell>
                  <TableCell>{full_name}</TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
