import { FC } from "react";
import Avatar from "../Avatar";

type PodiumProps = {
  authors: AuthorPerformance[];
};

const Podium: FC<PodiumProps> = ({ authors }) => {
  if (!authors || authors.length === 0) return null;

  // Get top 3 authors
  const [first, second, third] = authors.slice(0, 3);

  return (
    <div className="flex items-end justify-center gap-4 py-4">
      {/* Second Place - Left, Medium Height */}
      {second && (
        <div className="flex flex-col items-center">
          <div className="mb-2">
            <Avatar {...second} size="small" clickable />
            <div className="text-center mt-1">
              <div className="text-sm font-medium text-smoke-700 dark:text-smoke-300">
                {second.postCount} posts
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-t from-slate-400 to-slate-300 rounded-t-lg p-4 h-24 flex flex-col justify-end items-center min-w-[80px]">
            <div className="bg-slate-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
              2
            </div>
          </div>
        </div>
      )}

      {/* First Place - Center, Highest */}
      {first && (
        <div className="flex flex-col items-center">
          <div className="mb-2">
            <Avatar {...first} size="small" clickable />
            <div className="text-center mt-1">
              <div className="text-sm font-medium text-smoke-700 dark:text-smoke-300">
                {first.postCount} posts
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-t from-yellow-400 to-yellow-300 rounded-t-lg p-4 h-32 flex flex-col justify-end items-center min-w-[80px]">
            <div className="bg-yellow-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
              1
            </div>
          </div>
        </div>
      )}

      {/* Third Place - Right, Lowest Height */}
      {third && (
        <div className="flex flex-col items-center">
          <div className="mb-2">
            <Avatar {...third} size="small" clickable />
            <div className="text-center mt-1">
              <div className="text-sm font-medium text-smoke-700 dark:text-smoke-300">
                {third.postCount} posts
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-t from-amber-600 to-amber-500 rounded-t-lg p-4 h-16 flex flex-col justify-end items-center min-w-[80px]">
            <div className="bg-amber-700 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
              3
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Podium;
