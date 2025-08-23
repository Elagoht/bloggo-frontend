import {
  IconClock,
  IconEye,
  IconFileText,
  IconUser,
} from "@tabler/icons-react";
import { FC } from "react";
import { Link } from "react-router-dom";

const getStatusColor = (status: number) => {
  switch (status) {
    case 0: // DRAFT
      return "bg-smoke-100 dark:bg-smoke-900 text-smoke-600 dark:text-smoke-400";
    case 1: // PENDING
      return "bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-400";
    case 2: // APPROVED
      return "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400";
    case 3: // REJECTED
      return "bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400";
    case 4: // SCHEDULED
      return "bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400";
    case 5: // PUBLISHED
      return "bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400";
    default:
      return "bg-smoke-100 dark:bg-smoke-900 text-smoke-600 dark:text-smoke-400";
  }
};

const getStatusText = (status: number) => {
  switch (status) {
    case 0:
      return "Draft";
    case 1:
      return "Pending";
    case 2:
      return "Approved";
    case 3:
      return "Rejected";
    case 4:
      return "Scheduled";
    case 5:
      return "Published";
    default:
      return "Unknown";
  }
};

const PostCard: FC<PostCard> = ({
  postId,
  author,
  title,
  coverImage,
  spot,
  status,
  readCount,
  updatedAt,
  category,
}) => {
  return (
    <Link
      to={`/posts/details/${postId}`}
      className="group flex flex-col bg-smoke-0 dark:bg-smoke-950 rounded-xl border border-smoke-200 dark:border-smoke-800 p-4 gap-3 hover:border-gopher-300 dark:hover:border-gopher-700 hover:shadow-md transition-all duration-200"
    >
      {coverImage && (
        <div className="aspect-video w-full bg-smoke-100 dark:bg-smoke-900 rounded-lg overflow-hidden -mx-1 -mt-1 mb-1">
          <img
            src={import.meta.env.VITE_API_URL + coverImage}
            alt={title || "Blog post cover"}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
          />
        </div>
      )}

      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <div className="p-2 bg-gopher-100 dark:bg-gopher-900 text-gopher-600 dark:text-gopher-400 rounded-lg group-hover:bg-gopher-200 dark:group-hover:bg-gopher-800 transition-colors">
            <IconFileText size={16} />
          </div>
          <h3 className="font-semibold text-smoke-900 dark:text-smoke-100 truncate">
            {title || "Untitled"}
          </h3>
        </div>

        <div
          className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
            status
          )}`}
        >
          <span>{getStatusText(status)}</span>
        </div>
      </div>

      {spot && (
        <p className="text-sm text-smoke-600 dark:text-smoke-400 leading-relaxed line-clamp-2 flex-1">
          {spot}
        </p>
      )}

      <div className="flex items-center justify-between text-xs text-smoke-500 dark:text-smoke-500">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <IconUser size={12} />
            <span>{author.name}</span>
          </div>

          {category.name && (
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 bg-gopher-400 rounded-full"></span>
              <span>{category.name}</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <IconEye size={12} />
            <span>{readCount}</span>
          </div>

          <div className="flex items-center gap-1">
            <IconClock size={12} />

            <time>{new Date(updatedAt).toLocaleDateString()}</time>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
