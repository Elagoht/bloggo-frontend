import {
  IconCategory,
  IconClock,
  IconEye,
  IconFileText,
  IconUser,
} from "@tabler/icons-react";
import { FC } from "react";
import { Link } from "react-router-dom";
import { PostStatus } from "../../../../utilities/PostStatusUtils";
import classNames from "classnames";

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
      className="group relative flex flex-col bg-smoke-0 dark:bg-smoke-950 rounded-2xl border border-smoke-200 dark:border-smoke-800 overflow-hidden hover:border-gopher-300 dark:hover:border-gopher-700 transition-all duration-300"
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
          className={classNames(
            "absolute top-1 left-1 flex items-center gap-1 p-1.5 rounded-full text-xs font-semibold backdrop-blur-md shadow-lg",
            PostStatus.getStatusColor(status, "badge")
          )}
        >
          <span>{PostStatus.getStatusText(status)}</span>
        </div>

        {/* View Count - Top Right */}
        <div className="absolute top-1 right-1 flex items-center gap-1.5 pr-2.5 p-1.5 rounded-full text-xs font-medium bg-black/50 text-white backdrop-blur-md shadow-lg">
          <IconEye size={16} />

          <span>{readCount}</span>
        </div>

        {/* Category - Bottom Left */}
        {category.name && (
          <Link
            to={`/categories/details/${category.slug}`}
            className="absolute bottom-1 left-1 flex items-center gap-1.5 pr-2.5 p-1.5 rounded-full rounded-bl-none text-xs font-medium bg-black/50 text-white backdrop-blur-md shadow-lg hover:bg-black/60 transition-colors duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <IconCategory size={16} />

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
            to={`/users/details/${author.id}`}
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
            <IconClock size={16} className="text-gopher-500" />

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
