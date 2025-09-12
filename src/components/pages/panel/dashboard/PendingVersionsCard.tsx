import { IconFileText } from "@tabler/icons-react";
import { FC } from "react";
import BoxHeader from "../../../common/BoxHeader";

type PendingVersionsCardProps = {
  pendingVersions?: PendingVersion[];
};

const PendingVersionsCard: FC<PendingVersionsCardProps> = ({
  pendingVersions,
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="bg-smoke-50 dark:bg-smoke-950 rounded-xl border border-smoke-200/60 dark:border-smoke-700/60 p-4">
      <BoxHeader
        icon={<IconFileText />}
        title="Pending Versions"
        variant="gopher"
      />

      {!pendingVersions || pendingVersions.length === 0 ? (
        <div className="text-center py-8">
          <div className="w-12 h-12 bg-smoke-100 dark:bg-smoke-800 rounded-full flex items-center justify-center mx-auto mb-3">
            <IconFileText className="w-4 h-4 text-smoke-400" />
          </div>
          <p className="text-smoke-500 text-sm">No pending versions</p>
        </div>
      ) : (
        pendingVersions.slice(0, 5).map((version) => (
          <div
            key={version.id}
            className="bg-smoke-50 dark:bg-smoke-800/50 rounded-lg p-3 hover:bg-smoke-100 dark:hover:bg-smoke-800 transition-colors duration-150"
          >
            <div className="font-medium text-smoke-900 dark:text-smoke-100 truncate mb-1">
              {version.title}
            </div>
            <div className="text-smoke-500 dark:text-smoke-400 text-xs flex items-center gap-1">
              <span>by {version.authorName}</span>
              <span className="w-1 h-1 bg-smoke-400 rounded-full"></span>
              <span>{formatDate(version.createdAt)}</span>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default PendingVersionsCard;
