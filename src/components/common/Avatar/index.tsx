import { A } from "@solidjs/router";
import { IconEdit } from "@tabler/icons-solidjs";
import { Component } from "solid-js";
import Button from "../../form/Button";
import AvatarImage from "./AvatarImage";

type AvatarProps = Partial<
  Pick<ResponseUser, "id" | "avatar" | "email" | "roleId" | "roleName">
> &
  Pick<ResponseUser, "name"> & {
    editAt?: string;
  };

const Avatar: Component<AvatarProps> = ({
  avatar,
  name,
  email,
  roleId,
  roleName,
  editAt,
}) => {
  return (
    <section class="flex flex-col text-center items-center">
      <figure class="relative">
        <AvatarImage name={name} avatar={avatar} />

        {roleId && roleName && (
          <div class="absolute bottom-0 left-0 right-0">
            <A
              href={`/roles/details/${roleId}`}
              class="leading-snug px-2 py-1 rounded-full text-center bg-success-500"
            >
              {roleName}
            </A>
          </div>
        )}

        {editAt && (
          <Button class="absolute top-3 right-3 rounded-full" href={editAt}>
            {<IconEdit />}
          </Button>
        )}
      </figure>

      <strong class="text-3xl">{name}</strong>

      {email && (
        <a
          target="_blank"
          href={`mailto:${email}`}
          class="text-smoke-700 dark:text-smoke-300 leading-snug"
        >
          {email}
        </a>
      )}
    </section>
  );
};

export default Avatar;
