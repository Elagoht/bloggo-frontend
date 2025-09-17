import { IconArticle, IconCalendarTime } from "@tabler/icons-react";
import { FC } from "react";
import Calendar from "../../../../../utilities/Calendar";

type RecentActivityItemProps = {
  activity: RecentActivity;
  index: number;
};

const RecentActivityItem: FC<RecentActivityItemProps> = ({
  activity,
  index,
}) => {
  return (
    <article className="group relative bg-smoke-50 dark:bg-smoke-900 rounded-lg p-3 border border-smoke-200/40 dark:border-smoke-700/40 hover:border-gopher-300 dark:hover:border-gopher-600 transition-colors duration-150">
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0">
          <div className="w-9 h-9 bg-gopher-500 dark:bg-gopher-600 rounded-lg flex items-center justify-center shadow-sm">
            <IconArticle className="w-5 h-5 text-white" />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-smoke-900 dark:text-smoke-100 leading-tight mb-1">
            {activity.title}
          </h3>

          <div className="flex items-center gap-2 text-xs text-smoke-500 dark:text-smoke-400">
            <div className="flex items-center gap-1">
              <IconCalendarTime className="w-4 h-4 text-gopher-600 dark:text-gopher-400" />
              <span className="font-medium">Published</span>
            </div>

            <div className="w-1 h-1 rounded-full bg-smoke-300 dark:bg-smoke-600"></div>

            <time className="font-mono text-xs">
              {Calendar.formatDate(activity.publishedAt)}
            </time>
          </div>
        </div>

        <div className="flex-shrink-0">
          <div className="w-6 h-6 bg-smoke-200 dark:bg-smoke-700 rounded-full flex items-center justify-center text-xs font-bold text-smoke-600 dark:text-smoke-300">
            {index + 1}
          </div>
        </div>
      </div>
    </article>
  );
};

export default RecentActivityItem;
