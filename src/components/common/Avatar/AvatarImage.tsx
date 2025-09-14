import { FC, useMemo } from "react";
import Text from "../../../utilities/Text";

type AvatarSize = "small" | "large";

type AvatarImageProps = Partial<Pick<UserDetails, "avatar">> &
  Pick<UserDetails, "name"> & {
    size?: AvatarSize;
  };

const AvatarImage: FC<AvatarImageProps> = ({
  size = "large",
  name,
  avatar,
}) => {
  const initials = Text.getInitialLetters(name);

  const avatarSrc = useMemo(() => {
    if (!avatar) return "";
    if (avatar.startsWith("data:image")) return avatar;
    return import.meta.env.VITE_API_URL + avatar;
  }, [avatar]);

  const sizeClasses = {
    small: {
      container: "size-12",
      text: "text-lg",
      width: 48,
      height: 48,
    },
    large: {
      container: "size-48",
      text: "text-8xl",
      width: 192,
      height: 192,
    },
  };

  const currentSize = sizeClasses[size];

  return avatar ? (
    <img
      src={avatarSrc}
      alt={initials}
      width={currentSize.width}
      height={currentSize.height}
      className={`mx-auto mb-2 place-items-center grid text-center overflow-hidden object-cover object-center rounded-full ${currentSize.text} font-medium from-gopher-700 to-gopher-300 bg-gradient-to-tl ${currentSize.container}`}
    />
  ) : (
    <div
      className={`mx-auto mb-2 ${currentSize.text} font-medium bg-gopher-500 rounded-full ${currentSize.container} grid place-items-center`}
    >
      {initials}
    </div>
  );
};

export default AvatarImage;
