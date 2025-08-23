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
      return "bg-smoke-100 dark:bg-smoke-900 text-smoke-600 dark:text-smoke-400 border-smoke-200 dark:border-smoke-700";
    case 1: // PENDING
      return "bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-400 border-yellow-200 dark:border-yellow-700";
    case 2: // APPROVED
      return "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-700";
    case 3: // REJECTED
      return "bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400 border-red-200 dark:border-red-700";
    case 4: // SCHEDULED
      return "bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-700";
    case 5: // PUBLISHED
      return "bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 border-green-200 dark:border-green-700";
    default:
      return "bg-smoke-100 dark:bg-smoke-900 text-smoke-600 dark:text-smoke-400 border-smoke-200 dark:border-smoke-700";
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
      className="group relative flex flex-col bg-smoke-0 dark:bg-smoke-950 rounded-2xl border border-smoke-200 dark:border-smoke-800 overflow-hidden hover:border-gopher-300 dark:hover:border-gopher-700 hover:shadow-xl hover:shadow-gopher-500/10 dark:hover:shadow-gopher-400/10 transition-all duration-300 hover:-translate-y-1"
    >
      <div className="absolute inset-1 bg-gradien1-to-br from-gopher-50/50 to-transparent dark:from-gopher-950/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <figure className="relative aspect-video w-full bg-smoke-100 dark:bg-smoke-900 overflow-hidden">
        <img
          src={
            coverImage
              ? import.meta.env.VITE_API_URL + coverImage
              : "/assets/placeholder.webp"
          }
          alt="Blog post cover"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
        />
        <div className="absolute inset-1 bg-gradien1-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Status Badge - Top Left */}
        <div
          className={`absolute top-1 left-1 flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md shadow-lg ${getStatusColor(
            status
          )}`}
        >
          <span>{getStatusText(status)}</span>
        </div>

        {/* View Count - Top Right */}
        <div className="absolute top-1 right-1 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-black/50 text-white backdrop-blur-md shadow-lg">
          <IconEye size={13} />
          <span>{readCount}</span>
        </div>

        {/* Category - Bottom Left */}
        {category.name && (
          <Link
            to={`/categories/${category.id}`}
            className="absolute bottom-1 left-1 flex items-center gap-1.5 px-3 py-1.5 rounded-full rounded-bl-none text-xs font-medium bg-black/50 text-white backdrop-blur-md shadow-lg hover:bg-black/60 transition-colors duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-2 h-2 bg-white rounded-full" />
            <span>{category.name}</span>
          </Link>
        )}
      </figure>

      <div className="relative flex flex-col p-3 gap-3 flex-1">
        <div className="min-w-0 flex-1">
          <h3 className="font-bold text-base text-smoke-900 dark:text-smoke-100 line-clamp-2 group-hover:text-gopher-700 dark:group-hover:text-gopher-300 transition-colors duration-200">
            {title || "Untitled"}
          </h3>
          {spot && (
            <p className="text-sm text-smoke-600 dark:text-smoke-400 leading-relaxed line-clamp-2 opacity-80 group-hover:opacity-100 transition-opacity duration-200 mt-1">
              {spot}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between text-sm mt-auto">
          <Link
            to={`/users/${author.id}`}
            className="flex items-center gap-2 text-smoke-600 dark:text-smoke-400 hover:text-gopher-600 dark:hover:text-gopher-400 transition-colors duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {author.avatar ? (
              <img
                src={import.meta.env.VITE_API_URL + author.avatar}
                alt={author.name}
                className="w-5 h-5 rounded-full object-cover border border-smoke-200 dark:border-smoke-700"
              />
            ) : (
              <div className="w-5 h-5 rounded-full bg-gradient-to-br from-gopher-400 to-gopher-600 flex items-center justify-center text-white text-xs font-bold">
                {author.name.charAt(0).toUpperCase()}
              </div>
            )}
            <span className="font-medium text-sm">{author.name}</span>
          </Link>

          <div className="flex items-center gap-1.5 text-xs text-smoke-500 dark:text-smoke-500">
            <IconClock size={12} className="text-gopher-500" />
            <time className="font-medium">
              {new Date(updatedAt).toLocaleDateString()}
            </time>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
