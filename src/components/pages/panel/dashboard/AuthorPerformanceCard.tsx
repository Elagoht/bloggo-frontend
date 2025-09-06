import { IconUsers } from "@tabler/icons-react";
import { FC } from "react";

type AuthorPerformanceCardProps = {
  authorPerformance?: AuthorPerformance[];
};

const AuthorPerformanceCard: FC<AuthorPerformanceCardProps> = ({
  authorPerformance,
}) => {
  return (
    <div className="bg-smoke-50 dark:bg-smoke-950 rounded-xl border border-smoke-200/60 dark:border-smoke-700/60 p-4">
      <div className="flex items-center gap-3 mb-5">
        <div className="p-2 bg-smoke-100 dark:bg-smoke-800 rounded-lg">
          <IconUsers className="h-5 w-5 text-gopher-600 dark:text-gopher-400" />
        </div>
        <h3 className="text-lg font-semibold text-smoke-900 dark:text-smoke-100">
          Top Authors
        </h3>
      </div>
      {!authorPerformance || authorPerformance.length === 0 ? (
        <div className="text-center py-8">
          <div className="w-12 h-12 bg-smoke-100 dark:bg-smoke-800 rounded-full flex items-center justify-center mx-auto mb-3">
            <IconUsers className="w-4 h-4 text-smoke-400" />
          </div>
          <p className="text-smoke-500 text-sm">No published authors</p>
        </div>
      ) : (
        <div className="space-y-3">
          {authorPerformance.map((author, index) => (
            <div
              key={author.authorId}
              className="flex items-center justify-between bg-smoke-50 dark:bg-smoke-800/50 rounded-lg p-3 hover:bg-smoke-100 dark:hover:bg-smoke-800 transition-colors duration-150"
            >
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full flex items-center justify-center text-xs font-bold bg-gopher-100 dark:bg-gopher-900/30 text-gopher-700 dark:text-gopher-300">
                  {index + 1}
                </div>
                <span className="text-smoke-900 dark:text-smoke-100 font-medium truncate">
                  {author.authorName}
                </span>
              </div>
              <span className="text-gopher-600 dark:text-gopher-400 font-bold">
                {author.postCount}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AuthorPerformanceCard;
