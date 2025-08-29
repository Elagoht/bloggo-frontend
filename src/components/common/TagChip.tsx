import { FC } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";

interface TagChipProps {
  tag: {
    id: number;
    name: string;
    slug: string;
  };
  clickable?: boolean;
  size?: "sm" | "md";
}

const TagChip: FC<TagChipProps> = ({ tag, clickable = true, size = "sm" }) => {
  const chipClasses = classNames(
    "inline-flex items-center rounded-full font-medium transition-colors duration-200",
    {
      "px-2 py-1 text-xs": size === "sm",
      "px-3 py-1.5 text-sm": size === "md",
      "bg-gopher-100 text-gopher-700 dark:bg-gopher-800 dark:text-gopher-200 hover:bg-gopher-200 dark:hover:bg-gopher-700":
        clickable,
      "bg-smoke-100 text-smoke-700 dark:bg-smoke-800 dark:text-smoke-300":
        !clickable,
    }
  );

  const content = <span className={chipClasses}>#{tag.name}</span>;

  if (clickable) {
    return <Link to={`/tags/details/${tag.slug}`}>{content}</Link>;
  }

  return content;
};

export default TagChip;
