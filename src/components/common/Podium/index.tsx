import { FC } from "react";
import Avatar from "../Avatar";

type PodiumProps = {
  authors: AuthorPerformance[];
};

const Podium: FC<PodiumProps> = ({ authors }) => {
  if (!authors || authors.length === 0) return null;

  // Get top 3 authors and define their podium styles
  const podiumData = [
    {
      author: authors[1],
      position: 2,
      height: "h-24",
      gradientFrom: "from-slate-400",
      gradientTo: "to-slate-300",
      badgeBg: "bg-slate-600",
      badgeSize: "w-6 h-6",
    },
    {
      author: authors[0],
      position: 1,
      height: "h-32",
      gradientFrom: "from-yellow-400",
      gradientTo: "to-yellow-300",
      badgeBg: "bg-yellow-600",
      badgeSize: "w-8 h-8",
    },
    {
      author: authors[2],
      position: 3,
      height: "h-16",
      gradientFrom: "from-amber-600",
      gradientTo: "to-amber-500",
      badgeBg: "bg-amber-700",
      badgeSize: "w-6 h-6",
    },
  ];

  return (
    <div className="flex items-end justify-center gap-4 py-4">
      {podiumData.map((datum) => {
        if (!datum.author) return null;

        return (
          <div key={datum.position} className="flex flex-col items-center">
            <div className="mb-2">
              <Avatar {...datum.author} size="small" clickable />
              <div className="text-center mt-1">
                <div className="text-sm font-medium text-smoke-700 dark:text-smoke-300">
                  {datum.author.postCount} posts
                </div>
              </div>
            </div>
            <div
              className={`bg-gradient-to-t ${datum.gradientFrom} ${datum.gradientTo} rounded-t-lg p-4 ${datum.height} flex flex-col justify-end items-center min-w-[80px]`}
            >
              <div
                className={`${datum.badgeBg} text-white rounded-full ${datum.badgeSize} flex items-center justify-center text-sm font-bold`}
              >
                {datum.position}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Podium;
