import { Avatar, AvatarProps } from "@nextui-org/react";

interface IProps extends AvatarProps {
  avatarUrl?: string;
  fullName?: string;
}

export default function AvatarOrName({ avatarUrl, fullName, ...rest }: IProps) {
  return (
    <Avatar
      {...(avatarUrl ? { src: avatarUrl } : { name: fullName || "Anonymous" })}
      {...rest}
    />
  );
}
