import { IconUserCircle } from "@tabler/icons-react";
import classNames from "classnames";
import { FC, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useProfileStore } from "../../../../stores/profile";
import profileMenu from "./profile";

interface ProfileMenuProps {
  name: string;
}

const ProfileMenu: FC<ProfileMenuProps> = ({ name = "?" }) => {
  const navigate = useNavigate();
  const { profile } = useProfileStore();
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative flex flex-col items-end" ref={menuRef}>
      <button
        className="flex items-center gap-2 pr-2 p-1 rounded-full hover:bg-smoke-100 dark:hover:bg-smoke-900 transition-all duration-200 focus:outline-none group border border-transparent hover:border-smoke-200 dark:hover:border-smoke-700 shadow-sm hover:shadow-md"
        onClick={() => setMenuOpen((prev) => !prev)}
        aria-label="Open profile menu"
      >
        {profile?.avatar ? (
          <img
            src={import.meta.env.VITE_API_URL + profile.avatar}
            alt="Profile Picture"
            width={28}
            height={28}
            className="rounded-full border-2 border-gopher-200 dark:border-gopher-700 shadow-sm object-cover size-7 group-hover:border-gopher-300 dark:group-hover:border-gopher-600 transition-colors duration-200"
          />
        ) : (
          <div className="size-7 bg-gradient-to-br from-gopher-500 to-gopher-600 dark:from-gopher-400 dark:to-gopher-500 rounded-full flex items-center justify-center shadow-sm">
            <IconUserCircle size={18} className="text-white" />
          </div>
        )}

        <span className="font-medium text-smoke-800 dark:text-smoke-200 hidden sm:inline text-sm">
          {name}
        </span>
      </button>

      <nav
        className={classNames(
          "absolute right-0 w-36 mt-10 bg-smoke-50/95 rounded-xl dark:bg-smoke-950/95 shadow-xl border border-smoke-200/50 dark:border-smoke-800/50 z-50 overflow-hidden transition-all duration-200 origin-top-right backdrop-blur-lg",
          menuOpen
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-95 pointer-events-none"
        )}
      >
        {profileMenu.map((item, index) => {
          switch (item.role) {
            case "anchor":
              return (
                <Link
                  key={index}
                  to={item.href!}
                  className={classNames(
                    "flex items-center gap-2 p-1 transition-all duration-200 font-medium text-sm",
                    item.type === "danger"
                      ? "hover:bg-danger-50 dark:hover:bg-danger-900/30 text-danger-700 dark:text-danger-300 hover:text-danger-800 hover:dark:text-danger-200"
                      : "text-smoke-700 dark:text-smoke-300 hover:bg-smoke-100 dark:hover:bg-smoke-800/50 hover:text-smoke-900 dark:hover:text-smoke-100"
                  )}
                >
                  <span
                    className={classNames(
                      "p-1 rounded-lg",
                      item.type === "danger"
                        ? "bg-danger-100 dark:bg-danger-800/50"
                        : "bg-gopher-100 dark:bg-gopher-800/50"
                    )}
                  >
                    <item.icon
                      size={20}
                      className={classNames(
                        item.type === "danger"
                          ? "text-danger-600 dark:text-danger-400"
                          : "text-gopher-600 dark:text-gopher-400"
                      )}
                    />
                  </span>
                  {item.name}
                </Link>
              );
            case "button":
              return (
                <button
                  key={index}
                  onClick={() => item.work!(navigate)}
                  className={classNames(
                    "flex w-full items-center gap-2 p-1 transition-all duration-200 font-medium text-sm",
                    item.type === "danger"
                      ? "hover:bg-danger-50 dark:hover:bg-danger-900/30 text-danger-700 dark:text-danger-300 hover:text-danger-800 hover:dark:text-danger-200"
                      : "text-smoke-700 dark:text-smoke-300 hover:bg-smoke-100 dark:hover:bg-smoke-800/50 hover:text-smoke-900 dark:hover:text-smoke-100"
                  )}
                >
                  <span
                    className={classNames(
                      "p-1 rounded-lg",
                      item.type === "danger"
                        ? "bg-danger-100 dark:bg-danger-800/50"
                        : "bg-gopher-100 dark:bg-gopher-800/50"
                    )}
                  >
                    <item.icon
                      size={20}
                      className={classNames(
                        item.type === "danger"
                          ? "text-danger-600 dark:text-danger-400"
                          : "text-gopher-600 dark:text-gopher-400"
                      )}
                    />
                  </span>
                  {item.name}
                </button>
              );
            default:
              return null;
          }
        })}
      </nav>
    </div>
  );
};

export default ProfileMenu;
