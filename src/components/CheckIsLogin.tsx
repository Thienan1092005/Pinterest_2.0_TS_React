import { selectAuth } from "@/redux/slices/authSlice";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";

export default function CheckIsLogin({
  children,
}: {
  children: React.ReactNode;
}) {
  const { currentUser } = useSelector(selectAuth);
  if (currentUser) {
    return <>{children}</>;
  } else {
    return <Navigate to={"/news"} />;
  }
}
