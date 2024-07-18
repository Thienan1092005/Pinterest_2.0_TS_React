import { Card } from "@nextui-org/react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import MediaItem from "../news/components/Medias/MediaItem";
import { useAsync } from "@smojs/react-hooks";
import { getListMediaSavedByUserIdApi } from "@/apis/mediaApi";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Link } from "react-router-dom";
import RoundedButton from "@/components/customUi/RoundedButton";
export default function Saved({ id }: { id: number }) {
  const { data, isLoading } = useAsync(
    () => getListMediaSavedByUserIdApi(id),
    []
  );
  return (
    <Card className=" shadow-none">
      <div className=" my-4"></div>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        data && (
          <>
            {data?.data.length < 1 ? (
              <div className=" text-center mt-4 font-sf-regular">
                <p>
                  bạn chưa lưu ảnh nào , tìm kiếm ý tưởng / hình ảnh yêu thích
                  để lưu nhé
                </p>
                <Link to="/news">
                  <RoundedButton className=" mx-auto mt-4">
                    khám phá
                  </RoundedButton>
                </Link>
              </div>
            ) : (
              <ResponsiveMasonry
                columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3, 1200: 7 }}
              >
                <Masonry gutter="20px">
                  {data &&
                    data.data.map((media) => {
                      return (
                        <MediaItem
                          key={new Date().getTime()}
                          mediaData={media.media}
                        />
                      );
                    })}
                </Masonry>
              </ResponsiveMasonry>
            )}
          </>
        )
      )}
    </Card>
  );
}
