import RoundedButton from "@/components/customUi/RoundedButton";
import { Card } from "@nextui-org/react";
import { Link } from "react-router-dom";

export default function Created() {
  return (
    <Card className=" shadow-none mt-5  text-center">
      <div>
        <p>Chưa có gì để hiển thị! Ghim bạn tạo sẽ xuất hiện ở đây.</p>
        <Link to="/createpost">
          <RoundedButton className=" mx-auto mt-4">Tạo Ghim</RoundedButton>
        </Link>
      </div>
    </Card>
  );
}
