import { IconFileText } from "@tabler/icons-react";
import { FC } from "react";
import BoxHeader from "../../../common/BoxHeader";

type DraftCountCardProps = {
  draftCount?: DraftCount;
};

const DraftCountCard: FC<DraftCountCardProps> = ({ draftCount }) => {
  return (
    <div className="bg-smoke-50 dark:bg-smoke-950 rounded-xl border border-smoke-200/60 dark:border-smoke-700/60 p-4">
      <BoxHeader
        icon={<IconFileText />}
        title="Draft Count"
        variant="warning"
      />

      <div className="space-y-4">
        <div className="text-center">
          <div className="text-4xl font-bold text-warning-600 dark:text-warning-400 mb-2">
            {draftCount?.totalDrafts || 0}
          </div>
          <div className="text-sm text-smoke-500 dark:text-smoke-400">
            Total Drafts
          </div>
        </div>
        <div className="space-y-2">
          {!draftCount?.draftsByAuthor ||
          draftCount.draftsByAuthor.length === 0 ? (
            <div className="text-center py-4">
              <p className="text-smoke-500 text-sm">No drafts by author</p>
            </div>
          ) : (
            draftCount.draftsByAuthor
              ?.slice(0, 3)
              .map((author: DraftsByAuthor) => (
                <div
                  key={author.authorId}
                  className="flex justify-between items-center bg-smoke-50 dark:bg-smoke-800/50 rounded-lg p-2 text-sm"
                >
                  <span className="text-smoke-900 dark:text-smoke-100 truncate">
                    {author.authorName}
                  </span>
                  <span className="text-warning-600 dark:text-warning-400 font-semibold">
                    {author.draftCount}
                  </span>
                </div>
              ))
          )}
        </div>
      </div>
    </div>
  );
};

export default DraftCountCard;
