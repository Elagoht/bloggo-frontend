import { IconHistory } from "@tabler/icons-react";
import { FC } from "react";
import Calendar from "../../../../utilities/Calendar";
import BoxHeader from "../../../common/BoxHeader";

type RecentActivityCardProps = {
  recentActivity?: RecentActivity[];
};

const RecentActivityCard: FC<RecentActivityCardProps> = ({
  recentActivity,
}) => {
  return (
    <div className="bg-smoke-50 dark:bg-smoke-950 rounded-xl border border-smoke-200/60 dark:border-smoke-700/60 p-4 lg:col-span-2 xl:col-span-3">
      <BoxHeader
        icon={<IconHistory />}
        title="Recent Activity"
        variant="smoke"
      />

      {!recentActivity || recentActivity.length === 0 ? (
        <div className="grow flex flex-col items-center justify-center gap-2">
          <div className="w-12 h-12 bg-smoke-100 dark:bg-smoke-800 rounded-full grid place-items-center">
            <IconHistory className="size-5 text-smoke-400" />
          </div>

          <small className="text-smoke-500 text-sm">
            No activity recorded yet
          </small>
        </div>
      ) : (
        <ol className="flex flex-col gap-1">
          {recentActivity.map((activity) => (
            <div
              key={activity.id}
              className="bg-smoke-50 dark:bg-smoke-800/50 rounded-lg py-2 px-3 hover:bg-smoke-100 dark:hover:bg-smoke-800 transition-colors duration-150"
            >
              <div className="font-medium text-smoke-900 dark:text-smoke-100 truncate">
                {activity.title}
              </div>

              <div className="text-smoke-500 dark:text-smoke-400 text-xs flex items-center gap-1">
                <span className="text-gopher-500">Published</span>

                <hr className="inline size-1 rounded-full border-none bg-current" />

                <time>{Calendar.formatDate(activity.publishedAt)}</time>
              </div>
            </div>
          ))}
        </ol>
      )}
    </div>
  );
};

export default RecentActivityCard;
