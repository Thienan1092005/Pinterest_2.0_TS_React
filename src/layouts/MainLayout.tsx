import { Outlet } from "react-router";
import UnSignHeader from "@/components/UnSignHeader";
import SignedHeader from "@/components/SignedHeader";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function MainLayout() {
  const { isLogin } = useSelector((state: RootState) => state.auth);

  return (
    <>
      {isLogin ? <SignedHeader /> : <UnSignHeader />}
      <Outlet />
    </>
  );
}
