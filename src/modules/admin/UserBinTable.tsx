import { MediaItemType } from "@/apis/interfaces";
import { getListImagesApi } from "@/apis/mediaApi";
import AdminEditMedia from "@/components/formSystem/AdminEditMedia";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Image,
  Tooltip,
  useDisclosure,
  Modal,
  ModalContent,
} from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export default function UserBinTable() {
  const [selectPin, setSelectPin] = useState<MediaItemType>();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { data: lítImageData } = useQuery({
    queryKey: ["listPinData"],
    queryFn: async function () {
      const data = await getListImagesApi();
      return data.items;
    },
    staleTime: 1000 * 60 * 5,
  });

  return (
    <div>
      {lítImageData && (
        <Table
          aria-label="Example table with custom cells"
          classNames={{
            base: "text-black w-[70%] mx-auto font-sf-bold ",
          }}
        >
          <TableHeader>
            <TableColumn>ID</TableColumn>
            <TableColumn>IMAGE</TableColumn>
            <TableColumn>CREATER</TableColumn>
            <TableColumn>FUNCTION</TableColumn>
          </TableHeader>
          <TableBody>
            {lítImageData.map(({ id, image, name, user }, i) => (
              <TableRow key={i}>
                <TableCell>{id}</TableCell>
                <TableCell>
                  <div className=" flex max-w-[700px]  gap-x-6  items-center">
                    <Image width={120} src={image[0].url} />
                    <h1>{name}</h1>
                  </div>
                </TableCell>
                <TableCell>
                  <h1>{user.full_name}</h1>
                </TableCell>
                <TableCell>
                  <div className=" text-[24px]  flex gap-x-5">
                    <button
                      onClick={() => {
                        setSelectPin(lítImageData[i]), onOpen();
                      }}
                    >
                      <FaPencilAlt />
                    </button>
                    <Tooltip color="danger" content="Delete pin">
                      <button className="bg-transparent !p-0 !m-0 block">
                        <MdDelete className="text-danger-500" />
                      </button>
                    </Tooltip>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      {selectPin && (
        <Modal
          className=" !my-auto"
          onOpenChange={onOpenChange}
          isOpen={isOpen}
        >
          <ModalContent>
            <AdminEditMedia
              onClose={onClose}
              pinInfo={selectPin}
            ></AdminEditMedia>
          </ModalContent>
        </Modal>
      )}
    </div>
  );
}
