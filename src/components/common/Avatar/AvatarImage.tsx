import React, { useMemo } from "react";
import Text from "../../../utilities/Text";

type AvatarImageProps = Partial<Pick<ResponseUserDetails, "avatar">> &
  Pick<ResponseUserDetails, "name">;

const AvatarImage: React.FC<AvatarImageProps> = (props) => {
  const initials = Text.getInitialLetters(props.name);

  const avatarSrc = useMemo(() => {
    if (!props.avatar) return "";
    if (props.avatar.startsWith("data:image")) return props.avatar;
    return import.meta.env.VITE_API_URL + props.avatar;
  }, [props.avatar]);

  return props.avatar ? (
    <img
      src={avatarSrc}
      alt={initials}
      width={192}
      height={192}
      className="mx-auto mb-2 place-items-center grid text-center overflow-hidden object-cover object-center rounded-full text-8xl font-medium from-gopher-700 to-gopher-300 bg-gradient-to-tl size-48"
    />
  ) : (
    <div className="mx-auto mb-2 text-8xl font-medium bg-gopher-500 rounded-full size-48 grid place-items-center">
      {initials}
    </div>
  );
};

export default AvatarImage;
