import { useEffect, useState } from "react";
import { getListImagesApi } from "@/apis/mediaApi";
import MediaItem from "./MediaItem";
import { MediaItemType } from "@/apis/interfaces";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useParams } from "react-router-dom";

export default function MediaList() {
  const { slug } = useParams();

  const [mediaList, setMediaList] = useState<null | MediaItemType[]>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const getMediaList = async () => {
      try {
        setIsLoading(true);
        const { items } = await getListImagesApi();
        setMediaList(items);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getMediaList();
  }, []);

  const newMediaList = mediaList?.filter((item) => item.slug !== slug) || [];

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <ResponsiveMasonry
          columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3, 1200: 7 }}
        >
          <Masonry gutter="20px">
            {newMediaList.map((media) => {
              return <MediaItem key={media.slug} mediaData={media} />;
            })}
          </Masonry>
        </ResponsiveMasonry>
      )}
    </>
  );
}
