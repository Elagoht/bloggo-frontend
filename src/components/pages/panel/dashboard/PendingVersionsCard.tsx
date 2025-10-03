import { IconFileText, IconTag } from "@tabler/icons-react";
import { FC } from "react";
import { Link } from "react-router-dom";
import Calendar from "../../../../utilities/Calendar";
import MiniAvatar from "../../../common/Avatar/MiniAvatar";
import BoxHeader from "../../../common/BoxHeader";

type PendingVersionsCardProps = {
  pendingVersions?: PendingVersion[];
};

const PendingVersionsCard: FC<PendingVersionsCardProps> = ({
  pendingVersions,
}) => {
  return (
    <div className="bg-smoke-50 dark:bg-smoke-950 rounded-xl border border-smoke-200/60 dark:border-smoke-700/60 p-4">
      <BoxHeader
        icon={<IconFileText />}
        title="Pending Versions"
        variant="gopher"
      />

      {!pendingVersions || pendingVersions.length === 0 ? (
        <div className="grow flex flex-col items-center justify-center gap-2">
          <div className="w-12 h-12 bg-smoke-100 dark:bg-smoke-800 rounded-full grid place-items-center">
            <IconTag className="size-5 text-smoke-400" />
          </div>

          <small className="text-smoke-500 text-sm">No pending posts</small>
        </div>
      ) : (
        <ol className="flex flex-col gap-2 overflow-auto">
          {pendingVersions.map((version) => (
            <li
              key={version.id}
              className="flex flex-col bg-smoke-100 dark:bg-smoke-900 rounded-lg p-2 pt-1 gap-1"
            >
              <Link
                to={`/posts/${version.postId}/versions/${version.id}`}
                className="font-medium leading-snug hover:text-gopher-600 dark:hover:text-gopher-400 transition-colors"
              >
                {version.title}
              </Link>

              <data className="text-smoke-500 dark:text-smoke-400 text-xs flex items-center gap-1">
                <Link to={`/users/details/${version.authorId}`}>
                  <MiniAvatar
                    name={version.authorName}
                    avatar={version.authorAvatar}
                  />
                </Link>

                <hr className="inline size-1 rounded-full border-none bg-current" />

                <time>{Calendar.formatDate(version.createdAt)}</time>
              </data>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
};

export default PendingVersionsCard;
