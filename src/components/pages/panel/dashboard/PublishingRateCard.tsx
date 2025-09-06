import { IconCalendar } from "@tabler/icons-react";
import { FC } from "react";

type PublishingRateCardProps = {
  publishingRate?: PublishingRate;
};

const PublishingRateCard: FC<PublishingRateCardProps> = ({
  publishingRate,
}) => {
  return (
    <div className="bg-smoke-50 dark:bg-smoke-950 rounded-xl border border-smoke-200/60 dark:border-smoke-700/60 p-4">
      <div className="flex items-center gap-3 mb-5">
        <div className="p-2 bg-gopher-100 dark:bg-gopher-900/30 rounded-lg">
          <IconCalendar className="h-5 w-5 text-gopher-600 dark:text-gopher-400" />
        </div>
        <h3 className="text-lg font-semibold text-smoke-900 dark:text-smoke-100">
          Publishing Rate
        </h3>
      </div>
      <div className="space-y-4">
        <div className="bg-smoke-50 dark:bg-smoke-800/50 rounded-lg p-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-smoke-600 dark:text-smoke-400">
              This week
            </span>
            <span className="text-2xl font-bold text-gopher-600 dark:text-gopher-400">
              {publishingRate?.thisWeek || 0}
            </span>
          </div>
        </div>
        <div className="bg-smoke-50 dark:bg-smoke-800/50 rounded-lg p-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-smoke-600 dark:text-smoke-400">
              This month
            </span>
            <span className="text-2xl font-bold text-smoke-600 dark:text-smoke-400">
              {publishingRate?.thisMonth || 0}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublishingRateCard;
