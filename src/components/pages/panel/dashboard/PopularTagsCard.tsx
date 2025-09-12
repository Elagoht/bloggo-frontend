import { IconTag } from "@tabler/icons-react";
import { FC } from "react";
import TagChip from "../../../common/TagChip";
import BoxHeader from "../../../common/BoxHeader";

type PopularTagsCardProps = {
  popularTags?: PopularTag[];
};

const PopularTagsCard: FC<PopularTagsCardProps> = ({ popularTags }) => {
  return (
    <div className="bg-smoke-50 dark:bg-smoke-950 rounded-xl border border-smoke-200/60 dark:border-smoke-700/60 p-4">
      <BoxHeader icon={<IconTag />} title="Popular Tags" variant="gopher" />

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
            <div key={tag.id} className="relative">
              <TagChip
                tag={{
                  id: tag.id,
                  name: tag.name,
                  slug: tag.name.toLowerCase().replace(/\s+/g, "-"),
                }}
                size="md"
              />

              <span className="absolute -top-1 -right-1 bg-success-500 text-white text-xs rounded-full  px-1.5 h-4 flex items-center justify-center font-semibold">
                {tag.usage}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PopularTagsCard;
