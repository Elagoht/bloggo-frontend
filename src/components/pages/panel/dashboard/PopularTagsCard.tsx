import { IconTag } from "@tabler/icons-react";
import { FC } from "react";
import { Link } from "react-router-dom";
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
        <ol>
          {popularTags.map((tag, index) => (
            <Link key={index} to={`/tags/details/${tag.id}`}>
              <li className="flex gap-2 items-center border-b border-smoke-100 hover:bg-smoke-100 dark:border-smoke-900 dark:hover:bg-smoke-900 transition-all p-1">
                <span className="bg-gopher-500 size-5 text-sm grid place-items-center text-center rounded-full">
                  {index + 1}
                </span>

                <strong className="grow">{tag.name}</strong>

                <data className="bg-smoke-200 dark:bg-smoke-800 rounded-full px-2 text-sm">
                  {tag.usage}
                </data>
              </li>
            </Link>
          ))}
        </ol>
      )}
    </data>
  );
};

export default PopularTagsCard;
