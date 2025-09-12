import { IconChartPie } from "@tabler/icons-react";
import { FC } from "react";
import BoxHeader from "../../../common/BoxHeader";

type StorageUsageCardProps = {
  storageUsage?: StorageUsage;
};

const StorageUsageCard: FC<StorageUsageCardProps> = ({ storageUsage }) => {
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 MB";
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(2)} MB`;
  };

  return (
    <div className="bg-smoke-50 dark:bg-smoke-950 rounded-xl border border-smoke-200/60 dark:border-smoke-700/60 p-4">
      <BoxHeader
        icon={<IconChartPie />}
        title="Storage Usage"
        variant="warning"
      />

      <div className="space-y-4">
        <div className="text-center">
          <div className="text-3xl font-bold text-gopher-600 dark:text-gopher-400 mb-2">
            {formatFileSize(storageUsage?.totalSizeBytes || 0)}
          </div>
          <div className="text-sm text-smoke-500 dark:text-smoke-400">
            Used Storage
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-smoke-50 dark:bg-smoke-800/50 rounded-lg p-3 text-center">
            <div className="text-lg font-semibold text-smoke-900 dark:text-smoke-100">
              {storageUsage?.fileCount || 0}
            </div>
            <div className="text-xs text-smoke-500 dark:text-smoke-400">
              Files
            </div>
          </div>
          <div className="bg-smoke-50 dark:bg-smoke-800/50 rounded-lg p-3 text-center">
            <div className="text-lg font-semibold text-smoke-900 dark:text-smoke-100">
              {((storageUsage?.totalSizeBytes || 0) / 1024).toFixed(0)}K
            </div>
            <div className="text-xs text-smoke-500 dark:text-smoke-400">
              Total KB
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StorageUsageCard;
