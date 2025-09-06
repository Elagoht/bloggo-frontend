import { IconCalendar } from "@tabler/icons-react";
import { FC } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Dot,
} from "recharts";

type DailyViewsChartProps = {
  data: DailyViewCount[];
};

const DailyViewsChart: FC<DailyViewsChartProps> = ({ data }) => {
  // Fill missing days with 0 values for the rolling 30-day period
  const fillCompleteDays = (dailyData: DailyViewCount[]) => {
    const completeDays: DailyViewCount[] = [];

    // Create a map for quick lookup
    const dataMap = new Map(
      dailyData.map((item) => [item.day, item.viewCount])
    );

    // Generate last 30 days
    const today = new Date();
    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const dayOfMonth = date.getDate();

      completeDays.push({
        day: dayOfMonth,
        viewCount: dataMap.get(dayOfMonth) || 0,
        date, // Add full date for display purposes
      });
    }

    return completeDays;
  };

  const completeData = fillCompleteDays(data);

  // Get total views for the 30-day period
  const totalViews = completeData.reduce(
    (sum, item) => sum + item.viewCount,
    0
  );

  // Get today for highlighting
  const today = new Date();
  const isToday = (date: Date) => {
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  // Prepare data for Recharts with proper date formatting
  const chartData = completeData.map((item) => ({
    day: item.day.toString(),
    dayNumber: item.day,
    views: item.viewCount,
    date: item.date,
    label: `${item.date.getMonth() + 1}/${item.day}`, // MM/DD format
    isToday: isToday(item.date),
  }));

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const dateStr = data.date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
      return (
        <div className="bg-smoke-900 dark:bg-smoke-100 text-smoke-100 dark:text-smoke-900 text-xs px-3 py-2 rounded-lg shadow-lg border border-smoke-700 dark:border-smoke-300">
          <div className="font-semibold">{dateStr}</div>
          <div className="text-smoke-400 dark:text-smoke-600">
            {data.views} view{data.views !== 1 ? "s" : ""}
          </div>
        </div>
      );
    }
    return null;
  };

  // Custom dot component to highlight today
  const CustomDot = (props) => {
    const { cx, cy, payload } = props;
    if (payload.isToday) {
      return (
        <Dot
          cx={cx}
          cy={cy}
          r={4}
          fill="#D97706"
          stroke="#D97706"
          strokeWidth={2}
        />
      );
    }
    return <Dot cx={cx} cy={cy} r={2} fill="#10B981" />;
  };

  return (
    <div className="bg-smoke-0 dark:bg-smoke-950 rounded-xl border border-smoke-200 dark:border-smoke-800 p-4">
      <div className="flex items-start justify-between mb-6">
        <h3 className="text-lg font-semibold text-smoke-900 dark:text-smoke-100 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-smoke-100 dark:bg-smoke-800 text-smoke-600 dark:text-smoke-400">
            <IconCalendar size={20} />
          </div>
          Last 30 Days
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

      <div className="h-48 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{
              top: 5,
              right: 5,
              left: 5,
              bottom: 5,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              className="opacity-30"
              stroke="currentColor"
            />
            <XAxis
              dataKey="label"
              axisLine={false}
              tickLine={false}
              tick={{
                fontSize: 12,
                fill: "currentColor",
                className: "text-smoke-600 dark:text-smoke-400 font-mono",
              }}
              interval="preserveStartEnd" // Show start and end dates
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{
                fontSize: 11,
                fill: "currentColor",
                className: "text-smoke-600 dark:text-smoke-400",
              }}
              width={25}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="views"
              stroke="#10B981"
              strokeWidth={2}
              dot={<CustomDot />}
              activeDot={{
                r: 5,
                stroke: "#10B981",
                strokeWidth: 2,
                fill: "#10B981",
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {totalViews === 0 && (
        <div className="flex items-center justify-center py-4">
          <div className="text-smoke-500 dark:text-smoke-400 text-sm">
            No views recorded in the last 30 days
          </div>
        </div>
      )}
    </div>
  );
};

export default DailyViewsChart;
