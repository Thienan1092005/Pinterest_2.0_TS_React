import { MediaItemType } from "@/apis/interfaces";
import RoundedButton from "@/components/customUi/RoundedButton";
import { Card } from "@nextui-org/react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { Link } from "react-router-dom";
import MediaItem from "../news/components/Medias/MediaItem";
interface IProps {
  imageData: MediaItemType[];
}
export default function Created({ imageData }: IProps) {
  return (
    <Card className=" shadow-none mt-5  text-center">
      {imageData.length < 1 ? (
        <div>
          <p>Chưa có gì để hiển thị! Ghim bạn tạo sẽ xuất hiện ở đây.</p>
          <Link to="/createpost">
            <RoundedButton className=" mx-auto mt-4">Tạo Ghim</RoundedButton>
          </Link>
        </div>
      ) : (
        <ResponsiveMasonry
          columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3, 1200: 7 }}
        >
          <Masonry gutter="20px">
            {imageData &&
              imageData.map((media) => {
                return (
                  <MediaItem key={new Date().getTime()} mediaData={media} />
                );
              })}
          </Masonry>
        </ResponsiveMasonry>
      )}
    </Card>
  );
}
