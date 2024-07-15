import CreateGhim from "./CreateGhim";
import ImageList from "./ImageList";

export default function CreatePost() {
  return (
    <div className=" flex w-screen border-t-1 border-black/50">
      <ImageList />
      <CreateGhim />
    </div>
  );
}
