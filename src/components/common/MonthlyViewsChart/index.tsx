import { IconCalendarTime } from "@tabler/icons-react";
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

interface MonthlyViewsChartProps {
  data: MonthlyViewCount[];
}

const MonthlyViewsChart: FC<MonthlyViewsChartProps> = ({ data }) => {
  // Month names for display
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Fill missing months with 0 values for the rolling 12-month period
  const fillCompleteMonths = (monthlyData: MonthlyViewCount[]) => {
    const completeMonths: MonthlyViewCount[] = [];

    // Create a map for quick lookup using year-month key
    const dataMap = new Map(
      monthlyData.map((item) => [`${item.year}-${item.month}`, item.view_count])
    );

    // Generate last 12 months
    const today = new Date();
    for (let i = 11; i >= 0; i--) {
      const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
      const year = date.getFullYear();
      const month = date.getMonth() + 1; // getMonth() returns 0-11, we need 1-12
      const key = `${year}-${month}`;

      completeMonths.push({
        year,
        month,
        view_count: dataMap.get(key) || 0,
        date: date, // Add date for formatting
      });
    }

    return completeMonths;
  };

  const completeData = fillCompleteMonths(data);

  // Get total views for the 12-month period
  const totalViews = completeData.reduce(
    (sum, item) => sum + item.view_count,
    0
  );

  // Get current month for highlighting
  const currentDate = new Date();
  const isCurrentMonth = (year: number, month: number) => {
    return (
      year === currentDate.getFullYear() && month === currentDate.getMonth() + 1
    );
  };

  // Prepare data for Recharts with year-month formatting
  const chartData = completeData.map((item) => ({
    month: monthNames[item.month - 1], // Convert 1-12 to 0-11 for array index
    monthNumber: item.month,
    year: item.year,
    views: item.view_count,
    label:
      item.year === new Date().getFullYear()
        ? monthNames[item.month - 1]
        : `${monthNames[item.month - 1]} ${item.year.toString().slice(-2)}`,
    fullDate: item.date,
    isCurrentMonth: isCurrentMonth(item.year, item.month),
  }));

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const monthYear = `${data.month} ${data.year}`;
      return (
        <div className="bg-smoke-900 dark:bg-smoke-100 text-smoke-100 dark:text-smoke-900 text-xs px-3 py-2 rounded-lg shadow-lg border border-smoke-700 dark:border-smoke-300">
          <div className="font-semibold">{monthYear}</div>
          <div className="text-smoke-400 dark:text-smoke-600">
            {data.views} view{data.views !== 1 ? "s" : ""}
          </div>
        </div>
      );
    }
    return null;
  };

  // Custom dot component to highlight current month
  const CustomDot = (props: any) => {
    const { cx, cy, payload } = props;
    if (payload.isCurrentMonth) {
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
    return <Dot cx={cx} cy={cy} r={2} fill="#8B5CF6" />;
  };

  return (
    <div className="bg-smoke-0 dark:bg-smoke-950 rounded-xl border border-smoke-200 dark:border-smoke-800 p-4">
      <div className="flex items-start justify-between mb-6">
        <h3 className="text-lg font-semibold text-smoke-900 dark:text-smoke-100 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-smoke-100 dark:bg-smoke-800 text-smoke-600 dark:text-smoke-400">
            <IconCalendarTime size={20} />
          </div>
          Last 12 Months
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
                fontSize: 11,
                fill: "currentColor",
                className: "text-smoke-600 dark:text-smoke-400 font-mono",
              }}
              interval={1} // Show every other month to prevent crowding
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
              stroke="#8B5CF6"
              strokeWidth={2}
              dot={<CustomDot />}
              activeDot={{
                r: 5,
                stroke: "#8B5CF6",
                strokeWidth: 2,
                fill: "#8B5CF6",
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {totalViews === 0 && (
        <div className="flex items-center justify-center py-4">
          <div className="text-smoke-500 dark:text-smoke-400 text-sm">
            No views recorded in the last 12 months
          </div>
        </div>
      )}
    </div>
  );
};

export default MonthlyViewsChart;
