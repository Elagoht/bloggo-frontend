import { IconClock } from "@tabler/icons-react";
import classNames from "classnames";
import { FC } from "react";

interface HourlyViewsChartProps {
  data: HourlyViewCount[];
}

const HourlyViewsChart: FC<HourlyViewsChartProps> = ({ data }) => {
  // Fill missing hours with 0 values to show all 24 hours
  const fillCompleteHours = (hourlyData: HourlyViewCount[]) => {
    const completeHours: HourlyViewCount[] = [];

    // Create a map for quick lookup
    const dataMap = new Map(
      hourlyData.map((item) => [item.hour, item.view_count])
    );

    // Fill all 24 hours (0-23)
    for (let hour = 0; hour < 24; hour++) {
      completeHours.push({
        hour,
        view_count: dataMap.get(hour) || 0,
      });
    }

    return completeHours;
  };

  const completeData = fillCompleteHours(data);
  const maxViews = Math.max(...completeData.map((item) => item.view_count));

  // Get total views for today
  const totalViews = completeData.reduce(
    (sum, item) => sum + item.view_count,
    0
  );

  // Format hour for display (0 -> "00", 1 -> "01", etc.)
  const formatHour = (hour: number) => {
    return hour.toString().padStart(2, "0");
  };

  // Get current hour for highlighting
  const currentHour = new Date().getHours();

  return (
    <div className="bg-smoke-0 dark:bg-smoke-950 rounded-xl border border-smoke-200 dark:border-smoke-800 p-4">
      <div className="flex items-start justify-between">
        <h3 className="text-lg font-semibold text-smoke-900 dark:text-smoke-100 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-smoke-100 dark:bg-smoke-800 text-smoke-600 dark:text-smoke-400">
            <IconClock size={20} />
          </div>
          Last 24 Hours
        </h3>
        <div className="text-right">
          <div className="text-2xl font-bold text-smoke-900 dark:text-smoke-100">
            {totalViews.toLocaleString()}
          </div>
          <div className="text-sm text-smoke-500 dark:text-smoke-400">
            Total views
          </div>
        </div>
      </div>

      <ul className="grid grid-cols-hour-chart gap-px">
        {completeData.map((item) => {
          return (
            <li className="grid grid-rows-hour-chart">
              <div className="text-gopher-700 text-xs font-medium flex items-center justify-center">
                <span className="-rotate-90">
                  {item.view_count > 0 && item.view_count}
                </span>
              </div>

              {/* Chart area with fixed height */}
              <div className="flex items-end justify-center w-full h-48 bg-smoke-100/50 dark:bg-smoke-900/50 rounded-t-lg max-w-8 mx-auto">
                <div
                  className={classNames(
                    "w-full rounded-t-lg transition-all duration-300 group-hover:brightness-110 hover:dark:brightness-125",
                    {
                      "bg-smoke-300 dark:bg-smoke-700": item.view_count === 0,
                      "bg-gopher-500": item.view_count > 0,
                      "!bg-blue-500": item.hour === currentHour,
                    }
                  )}
                  style={{ height: (item.view_count / maxViews) * 100 + "%" }}
                  title={`${formatHour(item.hour)}:00 - ${
                    item.view_count
                  } views`}
                />
              </div>

              {/* Hour label */}
              <time className="font-mono text-xs lg:text-smoke-600 dark:text-smoke-400 transform whitespace-nowrap flex items-center justify-center">
                <span className="-rotate-90">{formatHour(item.hour)}</span>
              </time>
            </li>
          );
        })}
      </ul>

      {totalViews === 0 && (
        <div className="flex items-center justify-center py-4">
          <div className="text-smoke-500 dark:text-smoke-400 text-sm">
            No views recorded in the last 24 hours
          </div>
        </div>
      )}
    </div>
  );
};

export default HourlyViewsChart;
