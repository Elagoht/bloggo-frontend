import { IconUsers } from "@tabler/icons-react";
import { FC } from "react";
import BoxHeader from "../../../common/BoxHeader";
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
      ) : (
        <Podium authors={authorPerformance} />
      )}
    </data>
  );
};

export default AuthorPerformanceCard;
