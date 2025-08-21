import React from "react";
import {
  IconClock,
  IconCalendar,
  IconCalendarClock,
} from "@tabler/icons-react";

type ActivityDatesProps = {
  dates: Array<{
    title: string;
    time: string | Date;
  }>;
};

const ActivityDates: FC<ActivityDatesProps> = ({ dates }) => {
  const formatDate = (timestamp: string | Date) =>
    new Date(timestamp).toLocaleDateString(navigator.language, {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      weekday: "short",
    });

  return (
    <div className="flex flex-col gap-2">
      {dates.map((date, index) => (
        <article
          key={index}
          className="flex items-center gap-3 px-3 py-2 bg-white dark:bg-smoke-950 border border-smoke-200 dark:border-smoke-700 rounded-lg"
        >
          <span className="flex-shrink-0 p-1 bg-smoke-100 dark:bg-smoke-700 rounded">
            <IconCalendarClock
              size={16}
              className="text-smoke-700 dark:text-smoke-300"
            />
          </span>

          <dl className="flex flex-col">
            <dt className="text-sm font-medium text-smoke-900 dark:text-smoke-50">
              {date.title}
            </dt>

            <dd className="leading-none">
              <time
                className="text-xs text-smoke-600 dark:text-smoke-300"
                dateTime={date.time?.toString?.()}
              >
                {date.time && date.time !== "Never"
                  ? formatDate(date.time)
                  : "Never"}
              </time>
            </dd>
          </dl>
        </article>
      ))}
    </div>
  );
};

export default ActivityDates;
