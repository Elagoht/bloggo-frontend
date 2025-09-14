import { IconUsers } from "@tabler/icons-react";
import { FC } from "react";
import Avatar from "../../../common/Avatar";
import BoxHeader from "../../../common/BoxHeader";
import CardGrid from "../../../layout/Container/CardGrid";
import Podium from "../../../common/Podium";

type AuthorPerformanceCardProps = {
  authorPerformance?: AuthorPerformance[];
};

const AuthorPerformanceCard: FC<AuthorPerformanceCardProps> = ({
  authorPerformance,
}) => {
  return (
    <data className="bg-smoke-50 dark:bg-smoke-950 rounded-xl border border-smoke-200/60 dark:border-smoke-700/60 p-4 flex flex-col">
      <BoxHeader icon={<IconUsers />} title="Top Authors" variant="gopher" />

      {!authorPerformance || authorPerformance.length === 0 ? (
        <div className="grow flex flex-col items-center justify-center gap-2">
          <div className="w-12 h-12 bg-smoke-100 dark:bg-smoke-800 rounded-full grid place-items-center">
            <IconUsers className="size-5 text-smoke-400" />
          </div>

          <small className="text-smoke-500 text-sm">No Publisher Yet</small>
        </div>
      ) : authorPerformance.length <= 3 ? (
        <Podium authors={authorPerformance} />
      ) : (
        <div className="space-y-4">
          <Podium authors={authorPerformance.slice(0, 3)} />
          <div className="border-t border-smoke-200 dark:border-smoke-700 pt-4">
            <CardGrid compact>
              {authorPerformance.slice(3).map((author, index) => (
                <Avatar key={index + 3} {...author} size="small" clickable />
              ))}
            </CardGrid>
          </div>
        </div>
      )}
    </data>
  );
};

export default AuthorPerformanceCard;
