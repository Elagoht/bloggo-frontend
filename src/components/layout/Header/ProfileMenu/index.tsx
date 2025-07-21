import { A } from "@solidjs/router";
import {
  IconLogout,
  IconSettings,
  IconUserCircle,
} from "@tabler/icons-solidjs";
import classNames from "classnames";
import { Component, createSignal, For, onCleanup, onMount } from "solid-js";
import profileMenu from "./profile";

type ProfileMenuProps = {
  avatar?: string;
  name: string;
};

const ProfileMenu: Component<ProfileMenuProps> = ({ avatar, name = "?" }) => {
  const [menuOpen, setMenuOpen] = createSignal<boolean>(false);
  let menuRef: HTMLDivElement | undefined;

  // Close dropdown when clicking outside
  const handleClickOutside = (e: MouseEvent) => {
    if (menuRef && !menuRef.contains(e.target as Node)) {
      setMenuOpen(false);
    }
  };

  onMount(() => {
    document.addEventListener("mousedown", handleClickOutside);
    onCleanup(() =>
      document.removeEventListener("mousedown", handleClickOutside)
    );
  });

  return (
    <div class="relative flex flex-col items-end" ref={menuRef}>
      <button
        class="flex items-center gap-2 px-2 py-1 rounded-full hover:bg-smoke-100 dark:hover:bg-smoke-900 transition-colors focus:outline-none"
        onclick={() => setMenuOpen((prev) => !prev)}
        aria-label="Open profile menu"
      >
        {avatar ? (
          <img
            src={avatar}
            alt="Profile Picture"
            width={32}
            height={32}
            class="rounded-full border border-smoke-300 dark:border-smoke-700 shadow-sm"
          />
        ) : (
          <IconUserCircle size={32} />
        )}

        <span class="font-medium text-smoke-800 dark:text-smoke-200 hidden sm:inline">
          {name}
        </span>
      </button>

      <nav
        class={classNames(
          "absolute right-0 w-48 mt-10 bg-smoke-100 rounded-2xl dark:bg-smoke-950 shadow-lg border border-smoke-200 dark:border-smoke-800 z-50 overflow-hidden transition-all duration-200 origin-top-right bg-opacity-70 dark:bg-opacity-70 backdrop-blur-sm",
          menuOpen()
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-95 pointer-events-none"
        )}
      >
        <For each={profileMenu}>
          {(item) => (
            <A
              href={item.href}
              class={classNames(
                "flex items-center gap-2 px-2 py-1 transition-colors",
                item.type === 1
                  ? "hover:bg-danger-200 dark:hover:bg-danger-800 hover:text-danger-800 hover:dark:text-danger-200"
                  : "hover:bg-smoke-100 dark:hover:bg-smoke-800"
              )}
            >
              <item.icon size={18} /> {item.name}
            </A>
          )}
        </For>
      </nav>
    </div>
  );
};

export default ProfileMenu;
