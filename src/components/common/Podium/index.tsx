import classNames from "classnames";
import { FC } from "react";
import Avatar from "../Avatar";
import { IconBadge } from "@tabler/icons-react";

type PodiumProps = {
  authors: AuthorPerformance[];
};

const Podium: FC<PodiumProps> = ({ authors }) => {
  if (!authors || authors.length === 0) return null;

  const podiumData = [
    {
      author: authors[1],
      position: 2,
      height: "h-24",
      text: "text-slate-700",
      gradientFrom: "from-slate-400",
      gradientTo: "to-slate-300",
      badgeBg: "bg-slate-600",
      badgeSize: "w-6 h-6",
    },
    {
      author: authors[0],
      position: 1,
      height: "h-32",
      text: "text-yellow-700",
      gradientFrom: "from-yellow-400",
      gradientTo: "to-yellow-300",
      badgeBg: "bg-yellow-600",
      badgeSize: "w-8 h-8",
    },
    {
      author: authors[2],
      position: 3,
      height: "h-18",
      text: "text-amber-700",
      gradientFrom: "from-amber-600",
      gradientTo: "to-amber-500",
      badgeBg: "bg-amber-700",
      badgeSize: "w-6 h-6",
    },
  ];

  return (
    <section className="flex items-end justify-center gap-4 py-4">
      {podiumData.map((datum) => {
        if (!datum.author) return null;

        return (
          <div
            key={datum.position}
            className="flex flex-col gap-1 items-center"
          >
            <data className="text-center flex flex-col">
              <Avatar {...datum.author} size="small" clickable />

              <small className="text-sm text-smoke-700 dark:text-smoke-300">
                {datum.author.postCount} post{datum.author.postCount > 1 && "s"}
              </small>
            </data>

            <div
              className={classNames(
                "bg-gradient-to-t rounded-t-lg p-3 gap-2 flex flex-col justify-between items-center min-w-20",
                datum.gradientFrom,
                datum.gradientTo,
                datum.height
              )}
            >
              <IconBadge className={classNames("shrink-0", datum.text)} />

              <div
                className={classNames(
                  "text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0",
                  datum.badgeBg,
                  datum.badgeSize
                )}
              >
                {datum.position}
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default Podium;
