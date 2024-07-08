import { Outlet } from "react-router";
import UnSignHeader from "@/components/UnSignHeader";
import SignedHeader from "@/components/SignedHeader";

export default function MainLayout() {
  const isLogin = true;
  return (
    <>
      {isLogin ? <SignedHeader /> : <UnSignHeader />}
      <Outlet />
    </>
  );
}
