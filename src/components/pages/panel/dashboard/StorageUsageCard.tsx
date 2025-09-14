import { IconChartPie, IconFileText, IconPhoto } from "@tabler/icons-react";
import classNames from "classnames";
import { FC } from "react";
import {
  Cell,
  Pie,
  PieChart as RechartsPieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import {
  calculateRemainingUploads,
  calculateRemainingVersions,
  calculateStoragePercentage,
  formatBytes,
  getStorageColor,
} from "../../../../utilities/storage";
import BoxHeader from "../../../common/BoxHeader";

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
    storageUsage.usedByOthersBytes +
    storageUsage.usedByBloggoBytes +
    storageUsage.freeBytes;
  const totalUsedBytes =
    storageUsage.usedByOthersBytes + storageUsage.usedByBloggoBytes;
  const usedPercentage = calculateStoragePercentage(totalUsedBytes, totalBytes);

  const othersFormatted = formatBytes(storageUsage.usedByOthersBytes);
  const bloggoFormatted = formatBytes(storageUsage.usedByBloggoBytes);
  const freeFormatted = formatBytes(storageUsage.freeBytes);
  const totalFormatted = formatBytes(totalBytes);
  const totalUsedFormatted = formatBytes(totalUsedBytes);

  const remainingImages = calculateRemainingUploads(storageUsage.freeBytes);
  const remainingVersions = calculateRemainingVersions(storageUsage.freeBytes);

  // Prepare data for donut chart with formatted values - 3 segments
  const chartData = [
    {
      name: "Used by Others",
      value: storageUsage.usedByOthersBytes,
      formatted: othersFormatted.formatted,
      percentage: ((storageUsage.usedByOthersBytes / totalBytes) * 100).toFixed(
        1
      ),
      fill: "#6b7280", // gray-500
    },
    {
      name: "Used by Bloggo",
      value: storageUsage.usedByBloggoBytes,
      formatted: bloggoFormatted.formatted,
      percentage: ((storageUsage.usedByBloggoBytes / totalBytes) * 100).toFixed(
        1
      ),
      fill: "#d97706", // gopher color (amber-600)
    },
    {
      name: "Free Space",
      value: storageUsage.freeBytes,
      formatted: freeFormatted.formatted,
      percentage: ((storageUsage.freeBytes / totalBytes) * 100).toFixed(1),
      fill: "#e5e7eb", // gray-200
    },
  ].filter((item) => item.value > 0); // Only show segments with actual data

  // Custom tooltip component
  const CustomTooltip = ({
    active,
    payload,
  }: {
    active?: boolean;
    payload?: Array<{
      payload: { name: string; formatted: string; percentage: number };
    }>;
  }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-smoke-900 dark:bg-smoke-100 text-smoke-100 dark:text-smoke-900 text-xs px-3 py-2 rounded-lg shadow-lg border border-smoke-700 dark:border-smoke-300">
          <div className="font-semibold">{data.name}</div>
          <div className="text-smoke-400 dark:text-smoke-600">
            {data.formatted} ({data.percentage}%)
          </div>
        </div>
      );
    }
    return null;
  };

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
          <div className="relative h-48 w-48 -mb-8">
            <ResponsiveContainer
              width="100%"
              height="100%"
              className="relative z-10"
            >
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
                <Tooltip content={CustomTooltip} />
              </RechartsPieChart>
            </ResponsiveContainer>
            {/* Center text */}
            <div
              className={classNames(
                "absolute inset-0 flex flex-col items-center justify-center text-lg font-bold pointer-events-none",
                getStorageColor(usedPercentage)
              )}
            >
              {usedPercentage}%
              <small className="text-sm text-smoke-500 dark:text-smoke-400">
                {totalUsedFormatted.formatted}/{totalFormatted.formatted}
              </small>
            </div>
          </div>
        </div>

        {/* Storage Breakdown */}
        <div className="space-y-2">
          {chartData.map((item, index) => (
            <div key={index} className="flex items-center justify-between py-1">
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.fill }}
                />
                <span className="text-sm text-smoke-700 dark:text-smoke-300">
                  {item.name}
                  {item.name === "Used by Bloggo" &&
                    ` (${storageUsage.fileCount} files)`}
                </span>
              </div>
              <div className="text-sm font-medium text-smoke-900 dark:text-smoke-100">
                {item.formatted} ({item.percentage}%)
              </div>
            </div>
          ))}
        </div>

        {/* Estimated Remaining */}
        <div className="border-t border-smoke-200 dark:border-smoke-700 pt-3">
          <h4 className="text-xs font-medium text-smoke-700 dark:text-smoke-300 mb-2">
            Approximate Space Left
          </h4>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center space-x-2">
              <IconPhoto className="w-3 h-3 text-gopher-500" />
              <div>
                <small className="font-medium text-smoke-900 dark:text-smoke-100">
                  {remainingImages.toLocaleString()}
                </small>{" "}
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
                </small>{" "}
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
