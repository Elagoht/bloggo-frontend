import { IconHistory } from "@tabler/icons-react";
import { FC } from "react";
import BoxHeader from "../../../common/BoxHeader";

type RecentActivityCardProps = {
  recentActivity?: RecentActivity[];
};

const RecentActivityCard: FC<RecentActivityCardProps> = ({
  recentActivity,
}) => {
  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="bg-smoke-50 dark:bg-smoke-950 rounded-xl border border-smoke-200/60 dark:border-smoke-700/60 p-4 lg:col-span-2 xl:col-span-3">
      <BoxHeader
        icon={<IconHistory />}
        title="Recent Activity"
        variant="smoke"
      />

      {!recentActivity || recentActivity.length === 0 ? (
        <div className="text-center py-8">
          <div className="w-12 h-12 bg-smoke-100 dark:bg-smoke-800 rounded-full flex items-center justify-center mx-auto mb-3">
            <IconHistory className="w-4 h-4 text-smoke-400" />
          </div>
          <p className="text-smoke-500 text-sm">No recent activity</p>
        </div>
      ) : (
        <div className="space-y-3">
          {recentActivity.slice(0, 5).map((activity) => (
            <div
              key={activity.id}
              className="bg-smoke-50 dark:bg-smoke-800/50 rounded-lg p-3 hover:bg-smoke-100 dark:hover:bg-smoke-800 transition-colors duration-150"
            >
              <div className="font-medium text-smoke-900 dark:text-smoke-100 truncate mb-1">
                {activity.title}
              </div>
              <div className="text-smoke-500 dark:text-smoke-400 text-xs flex items-center gap-1">
                <span>Published</span>
                <span className="w-1 h-1 bg-smoke-400 rounded-full"></span>
                <span>{formatDateTime(activity.publishedAt)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentActivityCard;
