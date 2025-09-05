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

interface DailyViewsChartProps {
  data: DailyViewCount[];
}

const DailyViewsChart: FC<DailyViewsChartProps> = ({ data }) => {
  // Get the number of days in the previous month
  const getPreviousMonthDays = () => {
    const now = new Date();
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const lastDayOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    return lastDayOfLastMonth.getDate();
  };

  // Fill missing days with 0 values to show all days of the previous month
  const fillCompleteDays = (dailyData: DailyViewCount[]) => {
    const completeDays: DailyViewCount[] = [];
    const daysInMonth = getPreviousMonthDays();

    // Create a map for quick lookup
    const dataMap = new Map(
      dailyData.map((item) => [item.day, item.view_count])
    );

    // Fill all days in the previous month (1 to daysInMonth)
    for (let day = 1; day <= daysInMonth; day++) {
      completeDays.push({
        day,
        view_count: dataMap.get(day) || 0,
      });
    }

    return completeDays;
  };

  const completeData = fillCompleteDays(data);

  // Get total views for the month
  const totalViews = completeData.reduce(
    (sum, item) => sum + item.view_count,
    0
  );

  // Prepare data for Recharts
  const chartData = completeData.map((item) => ({
    day: item.day.toString(),
    dayNumber: item.day,
    views: item.view_count,
  }));

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-smoke-900 dark:bg-smoke-100 text-smoke-100 dark:text-smoke-900 text-xs px-3 py-2 rounded-lg shadow-lg border border-smoke-700 dark:border-smoke-300">
          <div className="font-semibold">Day {label}</div>
          <div className="text-smoke-400 dark:text-smoke-600">
            {data.views} view{data.views !== 1 ? "s" : ""}
          </div>
        </div>
      );
    }
    return null;
  };

  // Custom dot component
  const CustomDot = (props: any) => {
    const { cx, cy } = props;
    return <Dot cx={cx} cy={cy} r={2} fill="#10B981" />;
  };

  return (
    <div className="bg-smoke-0 dark:bg-smoke-950 rounded-xl border border-smoke-200 dark:border-smoke-800 p-4">
      <div className="flex items-start justify-between mb-6">
        <h3 className="text-lg font-semibold text-smoke-900 dark:text-smoke-100 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-smoke-100 dark:bg-smoke-800 text-smoke-600 dark:text-smoke-400">
            <IconCalendar size={20} />
          </div>
          Last Month
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
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{
                fontSize: 12,
                fill: "currentColor",
                className: "text-smoke-600 dark:text-smoke-400 font-mono",
              }}
              interval={4} // Show every 5th day
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
            No views recorded in the last month
          </div>
        </div>
      )}
    </div>
  );
};

export default DailyViewsChart;
