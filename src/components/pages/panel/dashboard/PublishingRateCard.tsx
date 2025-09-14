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
      title: "This week",
      value: publishingRate?.thisWeek || 0,
      css: "text-gopher-500",
    },
    { title: "This month", value: publishingRate?.thisMonth || 0 },
  ];

  return (
    <data className="bg-smoke-50 dark:bg-smoke-950 rounded-xl border border-smoke-200/60 dark:border-smoke-700/60 p-4 flex flex-col">
      <BoxHeader
        icon={<IconCalendar />}
        title="Publishing Rate"
        variant="success"
      />

      <ul className="grid grid-cols-2 gap-4 grow">
        {data.map((datum, index) => (
          <li
            key={index}
            className={classNames(
              "flex flex-col justify-center text-center bg-smoke-100 dark:bg-smoke-900 p-2 rounded-lg shadow-inner shadow-smoke-200 dark:shadow-smoke-800",
              datum.css
            )}
          >
            <small className="text-smoke-500">{datum.title}</small>

            <strong className="text-3xl">{datum.value}</strong>
          </li>
        ))}
      </ul>
    </data>
  );
};

export default PublishingRateCard;
