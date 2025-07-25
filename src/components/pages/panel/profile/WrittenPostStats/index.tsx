import { Component } from "solid-js";
import PostStatCounter from "./PostStatCounter";
import PublishmentRate from "./PublishmentRate";

type WrittenPostStatsProps = Pick<
  ResponseUser,
  "publishedPostCount" | "writtenPostCount"
>;

const WrittenPostStats: Component<WrittenPostStatsProps> = ({
  publishedPostCount,
  writtenPostCount,
}) => {
  return (
    <section class="flex justify-center flex-wrap gap-4 my-4">
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
