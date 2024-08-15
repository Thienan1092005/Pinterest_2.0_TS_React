import MediaItem from "./MediaItem";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useParams } from "react-router-dom";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getListImagesApi } from "@/apis/mediaApi";

export default function MediaList() {
  const { slug } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["mediaList"],
    queryFn: async function () {
      try {
        const { items } = await getListImagesApi();
        return items;
      } catch (error) {
        console.log(error);
      }
    },
    staleTime: 2 * 60 * 1000,
    placeholderData: keepPreviousData,
  });
  const newMediaList = data?.filter((item) => item.slug !== slug) || [];

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
