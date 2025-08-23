import { IconEye, IconFileText, IconPercentage } from "@tabler/icons-react";
import classNames from "classnames";
import { FC } from "react";

type UserStatsBarProps = {
  writtenPostCount: number;
  publishedPostCount: number;
};

const UserStatsBar: FC<UserStatsBarProps> = ({
  writtenPostCount,
  publishedPostCount,
}) => {
  const publishRatio =
    writtenPostCount > 0
      ? Math.round((publishedPostCount / writtenPostCount) * 100)
      : 0;

  const data = [
    {
      title: "Written Posts",
      value: writtenPostCount,
      icon: IconFileText,
      color: "gopher",
    },
    {
      title: "Published Posts",
      value: publishedPostCount,
      icon: IconEye,
      color: "success",
    },
    {
      title: "Publish Ratio",
      value: publishRatio,
      icon: IconPercentage,
      color: "default",
      isRatio: true,
    },
  ] as const;

  return (
    <section className="grid grid-cols-3 gap-2">
      {data.map((datum) => (
        <dl
          key={datum.title}
          className={classNames(
            "bg-white dark:bg-smoke-950 border border-smoke-200 dark:border-smoke-700 rounded-lg p-4 flex flex-col gap-4",
            {
              "text-gopher-500": datum.color === "gopher",
              "text-success-500": datum.color === "success",
            }
          )}
        >
          <dt className="flex flex-wrap items-center gap-2">
            <datum.icon size={20} className="shrink-0" />

            <small className="leading-snug font-medium">{datum.title}</small>
          </dt>

          <dd
            className={classNames("leading-4 text-2xl font-bold", {
              "text-gopher-600 dark:text-gopher-400": datum.color === "gopher",
              "text-success-600 dark:text-success-400":
                datum.color === "success",
            })}
          >
            {datum.value}
          </dd>
        </dl>
      ))}
    </section>
  );
};

export default UserStatsBar;
