import { FC } from "react";
import classNames from "classnames";
import AvatarImage from "./AvatarImage";

type MiniAvatarProps = {
  name: string;
  avatar?: string;
  className?: string;
};

const MiniAvatar: FC<MiniAvatarProps> = ({ name, avatar, className = "" }) => {
  return (
    <div className={classNames("inline-flex items-center gap-2", className)}>
      <AvatarImage name={name} avatar={avatar} size="mini" />
      <span className="text-sm">{name}</span>
    </div>
  );
};

export default MiniAvatar;
