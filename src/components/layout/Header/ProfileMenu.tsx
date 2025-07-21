import { A } from "@solidjs/router";
import { IconUserCircle } from "@tabler/icons-solidjs";
import classNames from "classnames";
import { Component, createSignal } from "solid-js";
import { className } from "solid-js/web";

type ProfileMenuProps = {
  avatar?: string;
  name: string;
};

const ProfileMenu: Component<ProfileMenuProps> = ({ avatar, name = "?" }) => {
  const [menuOpen, setMenuOpen] = createSignal<boolean>(false);

  return (
    <div class="flex flex-col">
      <figure onclick={() => setMenuOpen((prev) => !prev)}>
        {avatar ? (
          <img src={avatar} alt="Profile Picture" width={32} height={32} />
        ) : (
          <IconUserCircle size={32} />
        )}
      </figure>

      <nav
        class={classNames({
          hidden: !menuOpen(),
          flex: menuOpen(),
        })}
      >
        <A href="/profile">{name}</A>
      </nav>
    </div>
  );
};

export default ProfileMenu;
