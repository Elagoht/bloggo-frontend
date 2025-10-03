import { IconCalendar } from "@tabler/icons-react";
import classNames from "classnames";
import { FC } from "react";
import BoxHeader from "../../../common/BoxHeader";

type PublishingRateCardProps = {
  publishingRate?: PublishingRate;
};

const PublishingRateCard: FC<PublishingRateCardProps> = ({
  publishingRate,
}) => {
  const data = [
    {
      title: "Today",
      value: publishingRate?.today || 0,
      css: "text-success-500",
    },
    {
      title: "This week",
      value: publishingRate?.thisWeek || 0,
      css: "text-gopher-500",
    },
    {
      title: "This month",
      value: publishingRate?.thisMonth || 0,
      css: "text-warning-500",
    },
    {
      title: "This year",
      value: publishingRate?.thisYear || 0,
      css: "text-smoke-500",
    },
  ];

  return (
    <data className="bg-smoke-50 dark:bg-smoke-950 rounded-xl border border-smoke-200/60 dark:border-smoke-700/60 p-4 flex flex-col">
      <BoxHeader
        icon={<IconCalendar />}
        title="Publishing Rate"
        variant="success"
      />

      <ul className="grid grid-cols-2 gap-2 grow">
        {data.map((datum, index) => (
          <li
            key={index}
            className={classNames(
              "flex flex-col justify-center text-center bg-smoke-100 dark:bg-smoke-900 p-2 rounded-lg",
              datum.css
            )}
          >
            <strong className="text-4xl">{datum.value}</strong>

            <small className="text-smoke-500">{datum.title}</small>
          </li>
        ))}
      </ul>
    </data>
  );
};

export default PublishingRateCard;
