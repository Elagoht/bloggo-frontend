import { Component, For } from "solid-js";
import Fieldset from "../../layout/Container/Fieldset";

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

  "I'm a string".toString();
  return (
    <Fieldset legend="Activity">
      <For each={dates}>
        {(date) => (
          <>
            <strong class="text-sm text-smoke-500">{date.title}</strong>

            <time
              class="bg-smoke-50 dark:bg-smoke-950 px-2 py-1 rounded-md line-clamp-1"
              dateTime={date.time?.toString?.()}
            >
              {date.time ? formatDate(date.time) : "Never"}
            </time>
          </>
        )}
      </For>
    </Fieldset>
  );
};

export default ActivityDates;
