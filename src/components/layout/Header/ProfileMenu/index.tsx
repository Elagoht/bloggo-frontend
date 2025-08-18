import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IconUserCircle } from "@tabler/icons-react";
import classNames from "classnames";
import profileMenu from "./profile";

interface ProfileMenuProps {
  avatar?: string;
  name: string;
}

const ProfileMenu: React.FC<ProfileMenuProps> = ({ avatar, name = "?" }) => {
  const navigate = useNavigate();
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
        className="flex items-center gap-2 px-2 py-1 rounded-full hover:bg-smoke-100 dark:hover:bg-smoke-900 transition-colors focus:outline-none"
        onClick={() => setMenuOpen(prev => !prev)}
        aria-label="Open profile menu"
      >
        {avatar ? (
          <img
            src={avatar}
            alt="Profile Picture"
            width={32}
            height={32}
            className="rounded-full border border-smoke-300 dark:border-smoke-700 shadow-sm object-contain size-8"
          />
        ) : (
          <IconUserCircle size={32} className="size-8" />
        )}

        <span className="font-medium text-smoke-800 dark:text-smoke-200 hidden sm:inline">
          {name}
        </span>
      </button>

      <nav
        className={classNames(
          "absolute right-0 w-48 mt-10 bg-smoke-100 rounded-2xl dark:bg-smoke-950 shadow-lg border border-smoke-200 dark:border-smoke-800 z-50 overflow-hidden transition-all duration-200 origin-top-right bg-opacity-70 dark:bg-opacity-70 backdrop-blur-sm",
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
                    "flex items-center gap-2 px-2 py-1 transition-colors",
                    item.type === "danger"
                      ? "hover:bg-danger-200 dark:hover:bg-danger-800 hover:text-danger-800 hover:dark:text-danger-200"
                      : "hover:bg-smoke-100 dark:hover:bg-smoke-800"
                  )}
                >
                  <item.icon size={18} /> {item.name}
                </Link>
              );
            case "button":
              return (
                <button
                  key={index}
                  onClick={() => item.work!(navigate)}
                  className={classNames(
                    "flex w-full items-center gap-2 px-2 py-1 transition-colors",
                    item.type === "danger"
                      ? "hover:bg-danger-200 dark:hover:bg-danger-800 hover:text-danger-800 hover:dark:text-danger-200"
                      : "hover:bg-smoke-100 dark:hover:bg-smoke-800"
                  )}
                >
                  <item.icon size={18} /> {item.name}
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
