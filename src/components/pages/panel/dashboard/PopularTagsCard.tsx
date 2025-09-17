import { IconBadges, IconTag } from "@tabler/icons-react";
import classNames from "classnames";
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
        <ol className="flex flex-col gap-1">
          {popularTags.map((tag, index) => (
            <Link key={index} to={`/tags/details/${tag.slug}`}>
              <li className="flex gap-2 items-center hover:bg-smoke-100 dark:hover:bg-smoke-900 transition-all px-1 rounded-full">
                <span className="bg-gopher-500 size-5 text-sm grid place-items-center text-center rounded-full ">
                  {index + 1}
                </span>

                <strong className="grow">{tag.name}</strong>

                <div className="flex items-center gap-1">
                  {index < 3 && <PopularTagScoreBadge score={index} />}

                  <data className="bg-smoke-200 dark:bg-smoke-800 rounded-full px-2 text-sm">
                    {tag.usage}
                  </data>
                </div>
              </li>
            </Link>
          ))}
        </ol>
      )}
    </data>
  );
};

export default PopularTagsCard;

type PopularTagScoreBadgeProps = {
  score: number;
};

const PopularTagScoreBadge: FC<PopularTagScoreBadgeProps> = ({ score }) => {
  return (
    <div
      className={classNames("bg-gradient-to-tl rounded-full p-0.5", {
        "text-yellow-700 from-yellow-400 to-yellow-300": score === 0,
        "text-slate-700 from-slate-400 to-slate-300": score === 1,
        "text-amber-700 from-amber-600 to-amber-500": score === 2,
      })}
    >
      <IconBadges />
    </div>
  );
};
