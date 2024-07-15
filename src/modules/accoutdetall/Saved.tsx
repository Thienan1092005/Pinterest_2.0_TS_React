import { Card } from "@nextui-org/react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import MediaItem from "../news/components/Medias/MediaItem";
import { useAsync } from "@smojs/react-hooks";
import { getSavedImageApi } from "@/apis/mediaApi";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function Saved() {
  const { data, isLoading } = useAsync(() => getSavedImageApi(), []);
  return (
    <Card className=" shadow-none">
      <div className=" my-4"></div>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <ResponsiveMasonry
          columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3, 1200: 7 }}
        >
          <Masonry gutter="20px">
            {data &&
              data.map((media) => {
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
    </Card>
  );
}
