import AvatarOrName from "@/components/customUi/AvatarOrName";
interface IProp {
  avatar: string;
  full_name: string;
  content: string;
}
export default function WaitingComment({ avatar, full_name, content }: IProp) {
  return (
    <div className="w-full mb-5">
      <div className="flex gap-x-2">
        <AvatarOrName size="sm" src={avatar} name={full_name} />
        <div>
          <h1 className="font-sf-bold">{full_name}</h1>
          <p className="font-sf-light  ">{content}</p>
          <div className="flex gap-x-2 font-sf-light mt-1 text-sm">
            <h1>Đang viết .....</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
