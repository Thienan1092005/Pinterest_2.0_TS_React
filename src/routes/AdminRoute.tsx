import NotFound from "@/modules/notfound/NotFound";
import { selectAuth } from "@/redux/slices/authSlice";
import { useSelector } from "react-redux";

export default function AdminRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { currentUser } = useSelector(selectAuth);
  if (currentUser?.id == 13 || currentUser?.user_type.id == 2) {
    return children;
  } else {
    return <NotFound />;
  }
}
