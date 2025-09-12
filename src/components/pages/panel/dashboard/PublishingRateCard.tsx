import { IconCalendar } from "@tabler/icons-react";
import { FC } from "react";
import BoxHeader from "../../../common/BoxHeader";

type PublishingRateCardProps = {
  publishingRate?: PublishingRate;
};

const PublishingRateCard: FC<PublishingRateCardProps> = ({
  publishingRate,
}) => {
  return (
    <div className="bg-smoke-50 dark:bg-smoke-950 rounded-xl border border-smoke-200/60 dark:border-smoke-700/60 p-4">
      <BoxHeader
        icon={<IconCalendar />}
        title="Publishing Rate"
        variant="success"
      />

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
