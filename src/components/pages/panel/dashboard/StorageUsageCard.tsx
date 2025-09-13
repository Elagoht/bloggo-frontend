import { IconChartPie, IconPhoto, IconFileText } from "@tabler/icons-react";
import { FC } from "react";
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import BoxHeader from "../../../common/BoxHeader";
import {
  formatBytes,
  calculateStoragePercentage,
  calculateRemainingUploads,
  calculateRemainingVersions,
  getStorageColor,
} from "../../../../utilities/storage";
import classNames from "classnames";

type StorageUsageCardProps = {
  storageUsage?: StorageUsage;
};

const StorageUsageCard: FC<StorageUsageCardProps> = ({ storageUsage }) => {
  if (!storageUsage) {
    return (
      <div className="bg-smoke-50 dark:bg-smoke-950 rounded-xl border border-smoke-200/60 dark:border-smoke-700/60 p-4">
        <BoxHeader
          icon={<IconChartPie />}
          title="Storage Usage"
          variant="warning"
        />
        <div className="text-center py-8 text-smoke-500 dark:text-smoke-400">
          Storage information not available
        </div>
      </div>
    );
  }

  const totalBytes =
    storageUsage.filesystemUsedBytes + storageUsage.filesystemFreeBytes;
  const usedPercentage = calculateStoragePercentage(
    storageUsage.filesystemUsedBytes,
    totalBytes
  );

  const usedFormatted = formatBytes(storageUsage.filesystemUsedBytes);
  const freeFormatted = formatBytes(storageUsage.filesystemFreeBytes);
  const bloggoFormatted = formatBytes(storageUsage.bloggoUsedBytes);

  const remainingImages = calculateRemainingUploads(
    storageUsage.filesystemFreeBytes
  );
  const remainingVersions = calculateRemainingVersions(
    storageUsage.filesystemFreeBytes
  );

  // Prepare data for donut chart
  const chartData = [
    {
      name: "Used",
      value: storageUsage.filesystemUsedBytes,
      fill:
        usedPercentage >= 90
          ? "#dc2626"
          : usedPercentage >= 75
          ? "#ea580c"
          : "#16a34a",
    },
    {
      name: "Free",
      value: storageUsage.filesystemFreeBytes,
      fill: "#e5e7eb",
    },
  ];

  return (
    <div className="bg-smoke-50 dark:bg-smoke-950 rounded-xl border border-smoke-200/60 dark:border-smoke-700/60 p-4">
      <BoxHeader
        icon={<IconChartPie />}
        title="System Storage"
        variant="warning"
      />

      <div className="space-y-4">
        {/* Donut Chart */}
        <div className="flex flex-col items-center">
          <div className="relative h-48 w-48">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  startAngle={205}
                  endAngle={-25}
                  innerRadius="75%"
                  outerRadius="100%"
                  dataKey="value"
                  strokeWidth={0}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
              </RechartsPieChart>
            </ResponsiveContainer>
            {/* Center text */}
            <data
              className={classNames(
                "absolute inset-0 flex flex-col items-center justify-center text-lg font-bold",
                getStorageColor(usedPercentage)
              )}
            >
              {usedPercentage}%
              <small className="text-sm text-smoke-500 dark:text-smoke-400">
                Used
              </small>
            </data>
          </div>
        </div>

        {/* Storage Details */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-smoke-100 dark:bg-smoke-800/50 rounded-lg p-2">
            <small className="font-medium text-smoke-600 dark:text-smoke-400">
              Used
            </small>
            <div className="text-sm font-semibold text-smoke-900 dark:text-smoke-100">
              {usedFormatted.formatted}
            </div>
          </div>
          <div className="bg-smoke-100 dark:bg-smoke-800/50 rounded-lg p-2">
            <small className="font-medium text-smoke-600 dark:text-smoke-400">
              Free
            </small>
            <div className="text-sm font-semibold text-success-600 dark:text-success-400">
              {freeFormatted.formatted}
            </div>
          </div>
        </div>

        {/* Bloggo Usage */}
        <div className="bg-gopher-50 dark:bg-gopher-950/30 rounded-lg p-2">
          <small className="font-medium text-gopher-700 dark:text-gopher-300">
            Bloggo ({storageUsage.fileCount} files)
          </small>
          <div className="text-sm font-semibold text-gopher-600 dark:text-gopher-400">
            {bloggoFormatted.formatted}
          </div>
        </div>

        {/* Estimated Remaining */}
        <div className="border-t border-smoke-200 dark:border-smoke-700 pt-3">
          <h4 className="text-xs font-medium text-smoke-700 dark:text-smoke-300 mb-2">
            Space Left (~)
          </h4>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center space-x-2">
              <IconPhoto className="w-3 h-3 text-gopher-500" />
              <div>
                <small className="font-medium text-smoke-900 dark:text-smoke-100">
                  {remainingImages.toLocaleString()}
                </small>
                <small className="text-smoke-500 dark:text-smoke-400">
                  Images
                </small>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <IconFileText className="w-3 h-3 text-gopher-500" />
              <div>
                <small className="font-medium text-smoke-900 dark:text-smoke-100">
                  {remainingVersions.toLocaleString()}
                </small>
                <small className="text-smoke-500 dark:text-smoke-400">
                  Versions
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StorageUsageCard;
