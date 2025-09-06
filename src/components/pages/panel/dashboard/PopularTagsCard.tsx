import { IconTag } from "@tabler/icons-react";
import { FC } from "react";

type PopularTagsCardProps = {
  popularTags?: PopularTag[];
};

const PopularTagsCard: FC<PopularTagsCardProps> = ({ popularTags }) => {
  return (
    <div className="bg-smoke-50 dark:bg-smoke-950 rounded-xl border border-smoke-200/60 dark:border-smoke-700/60 p-4">
      <div className="flex items-center gap-3 mb-5">
        <div className="p-2 bg-success-100 dark:bg-success-900/30 rounded-lg">
          <IconTag className="h-5 w-5 text-success-600 dark:text-success-400" />
        </div>
        <h3 className="text-lg font-semibold text-smoke-900 dark:text-smoke-100">
          Popular Tags
        </h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {!popularTags || popularTags.length === 0 ? (
          <div className="w-full text-center py-8">
            <div className="w-12 h-12 bg-smoke-100 dark:bg-smoke-800 rounded-full flex items-center justify-center mx-auto mb-3">
              <IconTag className="w-4 h-4 text-smoke-400" />
            </div>
            <p className="text-smoke-500 text-sm">No tags found</p>
          </div>
        ) : (
          popularTags.slice(0, 8).map((tag) => (
            <span
              key={tag.id}
              className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-gradient-to-r from-success-100 to-success-200 dark:from-success-900/30 dark:to-success-800/30 text-success-800 dark:text-success-200 border border-success-200/50 dark:border-success-700/50 hover:scale-105 transition-transform duration-150"
            >
              {tag.name}
              <span className="ml-1 text-success-600 dark:text-success-400 font-semibold">
                {tag.usage}
              </span>
            </span>
          ))
        )}
      </div>
    </div>
  );
};

export default PopularTagsCard;
