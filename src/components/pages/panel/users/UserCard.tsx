import {
  IconClock,
  IconFileText,
  IconShield,
  IconUser,
} from "@tabler/icons-react";
import { FC, useMemo } from "react";
import { Link } from "react-router-dom";

interface UserCardProps {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  roleName: string;
  writtenPostCount: number;
  publishedPostCount: number;
}

const UserCard: FC<UserCardProps> = ({
  id,
  name,
  email,
  avatar,
  roleName,
  writtenPostCount,
  publishedPostCount,
}) => {
  const avatarSrc = useMemo(() => {
    if (!avatar) return "";
    if (avatar.startsWith("data:image")) return avatar;
    if (avatar.startsWith("/")) return import.meta.env.VITE_API_URL + avatar;
    return import.meta.env.VITE_API_URL + avatar;
  }, [avatar]);
  return (
    <Link
      to={`/users/details/${id}`}
      className="group flex flex-col bg-smoke-0 dark:bg-smoke-950 rounded-xl border border-smoke-200 dark:border-smoke-800 p-4 gap-3 hover:border-gopher-300 dark:hover:border-gopher-700 hover:shadow-md transition-all duration-200"
    >
      <header className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <div className="relative flex-shrink-0">
            {avatar ? (
              <img
                src={avatarSrc}
                alt={name}
                className="w-10 h-10 rounded-lg object-cover border border-smoke-200 dark:border-smoke-700"
              />
            ) : (
              <div className="w-10 h-10 bg-gopher-100 dark:bg-gopher-900 text-gopher-600 dark:text-gopher-400 rounded-lg flex items-center justify-center group-hover:bg-gopher-200 dark:group-hover:bg-gopher-800 transition-colors">
                <IconUser size={18} />
              </div>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-smoke-900 dark:text-smoke-100 truncate">
              {name}
            </h3>
            <p className="text-sm text-smoke-600 dark:text-smoke-400 truncate">
              {email}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 px-2 py-1 bg-smoke-100 dark:bg-smoke-900 text-smoke-600 dark:text-smoke-400 rounded-full text-xs font-medium flex-shrink-0">
          <IconShield size={12} />
          <span className="capitalize">{roleName}</span>
        </div>
      </header>

      <div className="flex items-center justify-between pt-2 border-t border-smoke-100 dark:border-smoke-800">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-sm text-smoke-600 dark:text-smoke-400">
            <IconFileText size={14} />
            <span>{writtenPostCount} written</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-smoke-600 dark:text-smoke-400">
            <IconClock size={14} />
            <span>{publishedPostCount} published</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default UserCard;
