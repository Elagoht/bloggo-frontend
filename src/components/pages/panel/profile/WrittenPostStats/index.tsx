import React, { FC } from "react";
import PostStatCounter from "./PostStatCounter";
import PublishmentRate from "./PublishmentRate";

type WrittenPostStatsProps = Pick<
  UserDetails,
  "publishedPostCount" | "writtenPostCount"
>;

const WrittenPostStats: FC<WrittenPostStatsProps> = ({
  publishedPostCount,
  writtenPostCount,
}) => {
  return (
    <section className="flex justify-center flex-wrap gap-4 my-4">
      <PostStatCounter label="Posts Written" value={writtenPostCount} />

      <PublishmentRate
        publishedPostCount={publishedPostCount}
        writtenPostCount={writtenPostCount}
      />

      <PostStatCounter label="Posts Published" value={publishedPostCount} />
    </section>
  );
};

export default WrittenPostStats;
