import { selectAuth } from "@/redux/slices/authSlice";
import { useSelector } from "react-redux";

export default function AdminGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const { currentUser } = useSelector(selectAuth);
  if (currentUser?.user_type.type_name === "Admin")
    return <div>{children}</div>;
}
