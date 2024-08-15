import { MediaItemType } from "@/apis/interfaces";
import { closeSearchModal } from "@/redux/slices/searchSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

export default function SearchItem({ image }: { image: MediaItemType }) {
  const dispatch = useDispatch();
  return (
    <Link
      className="flex hover:bg-gray-300 overflow-hidden w-[23%] justify-between items-center h-[100px] bg-gray-200"
      to={`/pin/${image.id}/Z${image.slug}`}
      onClick={() => {
        dispatch(closeSearchModal());
      }}
    >
      <img className="h-full w-1/4 object-cover" src={image.image[0].url} />
      <div className="h-full font-sf-regular flex flex-1 justify-center items-center">
        <h1 className="truncate">{image.name}</h1>
      </div>
    </Link>
  );
}
