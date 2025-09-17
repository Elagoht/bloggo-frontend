import { IconHistory } from "@tabler/icons-react";
import { FC } from "react";
import BoxHeader from "../../../../common/BoxHeader";
import RecentActivityItem from "./RecentActivityItem";

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
        <div className="flex flex-col gap-2">
          {recentActivity.map((activity, index) => (
            <RecentActivityItem
              key={activity.id}
              activity={activity}
              index={index}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentActivityCard;
