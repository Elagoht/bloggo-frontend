import { Component, For } from "solid-js";
import {
  IconClock,
  IconCalendar,
  IconCalendarClock,
} from "@tabler/icons-solidjs";

type ActivityDatesProps = {
  dates: Array<{
    title: string;
    time: string | Date;
  }>;
};

const ActivityDates: Component<ActivityDatesProps> = ({ dates }) => {
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
    <div class="flex flex-col gap-2">
      <For each={dates}>
        {(date) => (
          <article class="flex items-center gap-3 px-3 py-2 bg-white dark:bg-smoke-950 border border-smoke-200 dark:border-smoke-700 rounded-lg">
            <span class="flex-shrink-0 p-1 bg-smoke-100 dark:bg-smoke-700 rounded">
              <IconCalendarClock
                size={16}
                class="text-smoke-700 dark:text-smoke-300"
              />
            </span>

            <dl class="flex flex-col">
              <dt class="text-sm font-medium text-smoke-900 dark:text-smoke-50">
                {date.title}
              </dt>

              <dd class="leading-none">
                <time
                  class="text-xs text-smoke-600 dark:text-smoke-300"
                  dateTime={date.time?.toString?.()}
                >
                  {date.time ? formatDate(date.time) : "Never"}
                </time>
              </dd>
            </dl>
          </article>
        )}
      </For>
    </div>
  );
};

export default ActivityDates;
