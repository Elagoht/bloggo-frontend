import { FC, useMemo } from "react";
import classNames from "classnames";
import Text from "../../../utilities/Text";

type AvatarSize = "mini" | "small" | "large";

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
    mini: {
      container: "size-6",
      text: "text-xs",
      width: 24,
      height: 24,
    },
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
      className={classNames(
        "place-items-center grid text-center overflow-hidden object-cover object-center rounded-full font-medium from-gopher-700 to-gopher-300 bg-gradient-to-tl",
        currentSize.text,
        currentSize.container,
        {
          "mx-0 mb-0": size === "mini",
          "mx-auto mb-2": size !== "mini",
        }
      )}
    />
  ) : (
    <div
      className={classNames(
        "font-medium bg-gopher-500 text-white rounded-full grid place-items-center",
        currentSize.text,
        currentSize.container,
        {
          "mx-0 mb-0": size === "mini",
          "mx-auto mb-2": size !== "mini",
        }
      )}
    >
      {initials}
    </div>
  );
};

export default AvatarImage;
