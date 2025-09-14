import { IconTag } from "@tabler/icons-react";
import { FC } from "react";
import TagChip from "../../../common/TagChip";
import BoxHeader from "../../../common/BoxHeader";

type PopularTagsCardProps = {
  popularTags?: PopularTag[];
};

const PopularTagsCard: FC<PopularTagsCardProps> = ({ popularTags }) => {
  return (
    <data className="bg-smoke-50 dark:bg-smoke-950 rounded-xl border border-smoke-200/60 dark:border-smoke-700/60 p-4 flex flex-col">
      <BoxHeader icon={<IconTag />} title="Popular Tags" variant="gopher" />

      {!popularTags || popularTags.length === 0 ? (
        <div className="grow flex flex-col items-center justify-center gap-2">
          <div className="w-12 h-12 bg-smoke-100 dark:bg-smoke-800 rounded-full grid place-items-center">
            <IconTag className="size-5 text-smoke-400" />
          </div>

          <small className="text-smoke-500 text-sm">No tags found</small>
        </div>
      ) : (
        <div className="flex flex-wrap gap-2">
          {popularTags.slice(0, 8).map((tag) => (
            <div key={tag.id} className="relative">
              <TagChip
                tag={{
                  id: tag.id,
                  name: tag.name,
                  slug: tag.slug,
                }}
                size="md"
              />

              <span className="absolute -top-1 -right-1 bg-success-500 text-white text-xs rounded-full  px-1.5 h-4 flex items-center justify-center font-semibold">
                {tag.usage}
              </span>
            </div>
          ))}
        </div>
      )}
    </data>
  );
};

export default PopularTagsCard;
