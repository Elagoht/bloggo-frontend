import { IconEdit } from "@tabler/icons-react";
import classNames from "classnames";
import { FC } from "react";
import { Link } from "react-router-dom";
import Button from "../../form/Button";
import AvatarImage from "./AvatarImage";

type AvatarProps = Partial<
  Pick<UserDetails, "id" | "avatar" | "email" | "roleId" | "roleName">
> &
  Pick<UserDetails, "name"> & {
    editAt?: string;
    size?: "small" | "large";
    clickable?: boolean;
  };

const Avatar: FC<AvatarProps> = ({
  id,
  avatar,
  name,
  email,
  roleId,
  roleName,
  editAt,
  size = "large",
  clickable = false,
}) => {
  const avatarContent = (
    <section className="flex flex-col text-center items-center">
      <figure className="relative">
        <AvatarImage name={name} avatar={avatar} size={size} />

        {roleId && roleName && (
          <div className="absolute bottom-0 left-0 right-0 leading-snug px-2 py-1 rounded-full text-center w-fit mx-auto bg-success-500">
            {roleName}
          </div>
        )}

        {editAt && (
          <Button className="absolute top-3 right-3 rounded-full" href={editAt}>
            {<IconEdit />}
          </Button>
        )}
      </figure>

      <strong
        className={classNames({
          "text-sm": size === "small",
          "text-3xl": size === "large",
        })}
      >
        {name}
      </strong>

      {email && (
        <a
          target="_blank"
          href={`mailto:${email}`}
          className="text-smoke-700 dark:text-smoke-300 leading-snug"
          rel="noreferrer"
        >
          {email}
        </a>
      )}
    </section>
  );

  return clickable ? (
    <Link
      to={`/users/details/${id}`}
      className="block hover:opacity-80 transition-opacity"
    >
      {avatarContent}
    </Link>
  ) : (
    avatarContent
  );
};

export default Avatar;
