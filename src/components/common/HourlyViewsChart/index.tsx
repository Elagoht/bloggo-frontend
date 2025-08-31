import { IconClock } from "@tabler/icons-react";
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

  // Prepare data for Recharts
  const chartData = completeData.map((item) => ({
    hour: formatHour(item.hour),
    hourNumber: item.hour,
    views: item.view_count,
    isCurrentHour: item.hour === currentHour,
  }));

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-smoke-900 dark:bg-smoke-100 text-smoke-100 dark:text-smoke-900 text-xs px-3 py-2 rounded-lg shadow-lg border border-smoke-700 dark:border-smoke-300">
          <div className="font-semibold">{label}:00</div>
          <div className="text-smoke-400 dark:text-smoke-600">
            {data.views} view{data.views !== 1 ? "s" : ""}
          </div>
        </div>
      );
    }
    return null;
  };

  // Custom dot component to highlight current hour
  const CustomDot = (props: any) => {
    const { cx, cy, payload } = props;
    if (payload.isCurrentHour) {
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
    return <Dot cx={cx} cy={cy} r={2} fill="#3B82F6" />;
  };

  return (
    <div className="bg-smoke-0 dark:bg-smoke-950 rounded-xl border border-smoke-200 dark:border-smoke-800 p-4">
      <div className="flex items-start justify-between mb-6">
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
              dataKey="hour"
              axisLine={false}
              tickLine={false}
              tick={{
                fontSize: 12,
                fill: "currentColor",
                className: "text-smoke-600 dark:text-smoke-400 font-mono",
              }}
              interval={3} // Show every 4th hour
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
              stroke="#3B82F6"
              strokeWidth={2}
              dot={<CustomDot />}
              activeDot={{
                r: 5,
                stroke: "#3B82F6",
                strokeWidth: 2,
                fill: "#3B82F6",
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

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
