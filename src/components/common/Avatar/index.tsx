import { IconEdit } from "@tabler/icons-react";
import { FC } from "react";
import Button from "../../form/Button";
import AvatarImage from "./AvatarImage";

type AvatarProps = Partial<
  Pick<UserDetails, "id" | "avatar" | "email" | "roleId" | "roleName">
> &
  Pick<UserDetails, "name"> & {
    editAt?: string;
  };

const Avatar: FC<AvatarProps> = ({
  avatar,
  name,
  email,
  roleId,
  roleName,
  editAt,
}) => {
  return (
    <section className="flex flex-col text-center items-center">
      <figure className="relative">
        <AvatarImage name={name} avatar={avatar} />

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

      <strong className="text-3xl">{name}</strong>

      {email && (
        <a
          target="_blank"
          href={`mailto:${email}`}
          className="text-smoke-700 dark:text-smoke-300 leading-snug" rel="noreferrer"
        >
          {email}
        </a>
      )}
    </section>
  );
};

export default Avatar;
