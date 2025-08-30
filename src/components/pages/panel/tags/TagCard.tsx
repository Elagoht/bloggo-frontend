import { IconFileText, IconTag } from "@tabler/icons-react";
import { FC } from "react";
import { Link } from "react-router-dom";

const TagCard: FC<TagCard> = ({ name, slug, blogCount }) => {
  return (
    <Link
      to={`/tags/details/${slug}`}
      className="group flex bg-smoke-0 dark:bg-smoke-950 rounded-xl border border-smoke-200 dark:border-smoke-800 p-2 gap-2 hover:border-gopher-300 dark:hover:border-gopher-700 hover:shadow-md transition-all duration-200"
    >
      <div className="p-2 m-1 bg-gopher-100 dark:bg-gopher-900 text-gopher-600 dark:text-gopher-400 rounded-lg group-hover:bg-gopher-200 dark:group-hover:bg-gopher-800 transition-colors">
        <IconTag />
      </div>

      <div className="flex flex-col justify-center grow truncate">
        <h3 className="font-semibold text-smoke-900 dark:text-smoke-100 truncate">
          {name}
        </h3>

        <div className="flex items-center text-xs text-smoke-500">
          <IconFileText size={12} />

          <span>{blogCount}</span>
        </div>
      </div>
    </Link>
  );
};

export default TagCard;
