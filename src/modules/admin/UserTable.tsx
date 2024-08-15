import { getListUserApi } from "@/apis/userApi";
import {
  Chip,
  Modal,
  ModalContent,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
  useDisclosure,
  User,
} from "@nextui-org/react";
import { User as UserItem } from "@/apis/interfaces";
import { useQuery } from "@tanstack/react-query";
import { FaEye, FaPencilAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import AdminEditUserForm from "@/components/formSystem/AdminEditUserForm";
import { useState } from "react";

interface IProps {
  inSearchMode: boolean;
  searchUserData: UserItem[];
}

export default function UserTable({ inSearchMode, searchUserData }: IProps) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [clikedUser, setClickedUser] = useState<UserItem | null>(null);
  const { data: userListData } = useQuery({
    queryKey: ["listUserdata"],
    queryFn: async function () {
      try {
        const data = await getListUserApi();
        return data.data.items;
      } catch (error) {
        console.log(error);
      }
    },
    staleTime: 1000 * 60 * 5,
  });

  const displayedData = inSearchMode ? searchUserData : userListData || [];
  if (displayedData.length > 1) {
    return (
      <>
        <Table
          aria-label="Example table with custom cells"
          classNames={{
            base: "text-black",
          }}
        >
          <TableHeader>
            <TableColumn>ID</TableColumn>
            <TableColumn>NAME</TableColumn>
            <TableColumn>INFO</TableColumn>
            <TableColumn>STATUS</TableColumn>
            <TableColumn>ACTIONS</TableColumn>
          </TableHeader>
          <TableBody>
            {displayedData.map((user, i) => (
              <TableRow key={i}>
                <TableCell>{user.id}</TableCell>
                <TableCell>
                  <User
                    classNames={{
                      name: "font-sf-bold",
                      description: "font-sf-medium",
                    }}
                    name={user.full_name}
                    description={user.username}
                    avatarProps={{
                      src: user.avatar,
                    }}
                  />
                </TableCell>
                <TableCell>
                  <p>{user.user_type.type_name}</p>
                  <p>{user.email}</p>
                </TableCell>
                <TableCell>
                  <Chip
                    className="text-white font-sf-bold"
                    color={user.is_ban ? "danger" : "success"}
                  >
                    {user.is_ban ? "Banned" : "Active"}
                  </Chip>
                </TableCell>
                <TableCell>
                  <div className="flex gap-x-2 text-[20px]">
                    <Link to={`/profile/${user.id}/${user.username}`}>
                      <FaEye />
                    </Link>
                    <button
                      onClick={() => {
                        setClickedUser(user);
                        onOpen();
                      }}
                    >
                      <FaPencilAlt />
                    </button>
                    <Tooltip color="danger" content="Delete user">
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
        <Modal onOpenChange={onOpenChange} isOpen={isOpen}>
          <ModalContent className="m-auto p-5">
            <AdminEditUserForm userInfo={clikedUser} onClose={onClose} />
          </ModalContent>
        </Modal>
      </>
    );
  } else {
    return (
      <Table aria-label="Example empty table">
        <TableHeader>
          <TableColumn>STT</TableColumn>
          <TableColumn>NAME</TableColumn>
          <TableColumn>INFO</TableColumn>
          <TableColumn>STATUS</TableColumn>
          <TableColumn>ACTIONS</TableColumn>
        </TableHeader>
        <TableBody emptyContent={"No rows to display."}>{[]}</TableBody>
      </Table>
    );
  }
}
