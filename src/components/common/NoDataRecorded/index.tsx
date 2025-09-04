import { IconChartBar } from "@tabler/icons-react";
import { FC } from "react";

interface NoDataRecordedProps {
  message?: string;
  description?: string;
  className?: string;
}

const NoDataRecorded: FC<NoDataRecordedProps> = ({
  className,
  message = "No data recorded",
  description = "There is no data available to display at this time.",
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center py-8 px-4 text-center ${className}`}
    >
      <div className="p-3 rounded-full bg-smoke-100 dark:bg-smoke-800 text-smoke-400 dark:text-smoke-500 mb-3">
        <IconChartBar size={32} />
      </div>

      <h3 className="text-lg font-medium text-smoke-600 dark:text-smoke-400 mb-1">
        {message}
      </h3>

      <p className="text-sm text-smoke-500 dark:text-smoke-500 max-w-xs">
        {description}
      </p>
    </div>
  );
};

export default NoDataRecorded;
