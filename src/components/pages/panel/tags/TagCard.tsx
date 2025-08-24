import { IconFileText, IconTag } from "@tabler/icons-react";
import { FC } from "react";
import { Link } from "react-router-dom";

const TagCard: FC<TagCard> = ({ name, slug, blogCount }) => {
  return (
    <Link
      to={`/tags/details/${slug}`}
      className="group flex flex-col bg-smoke-0 dark:bg-smoke-950 rounded-xl border border-smoke-200 dark:border-smoke-800 p-4 gap-3 hover:border-gopher-300 dark:hover:border-gopher-700 hover:shadow-md transition-all duration-200"
    >
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-gopher-100 dark:bg-gopher-900 text-gopher-600 dark:text-gopher-400 rounded-lg group-hover:bg-gopher-200 dark:group-hover:bg-gopher-800 transition-colors">
            <IconTag size={16} />
          </div>
          <h3 className="font-semibold text-smoke-900 dark:text-smoke-100 truncate">
            {name}
          </h3>
        </div>

        <div className="flex items-center gap-1 px-2 py-1 bg-smoke-100 dark:bg-smoke-900 text-smoke-600 dark:text-smoke-400 rounded-full text-xs font-medium">
          <IconFileText size={12} />
          <span>{blogCount}</span>
        </div>
      </header>
    </Link>
  );
};

export default TagCard;
