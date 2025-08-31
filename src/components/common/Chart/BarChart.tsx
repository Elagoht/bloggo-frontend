import { Icon, IconProps } from "@tabler/icons-react";
import { FC, ForwardRefExoticComponent, RefAttributes } from "react";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface ChartDataItem {
  label: string;
  value: number;
  percentage: number;
  color?: string;
}

interface BarChartProps {
  title: string;
  data: ChartDataItem[];
  icon?: ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>;
}

const colors = [
  "#F5A623",
  "#BD10E0",
  "#4A90E2",
  "#7ED321",
  "#F8E71C",
  "#9013FE",
  "#50E3C2",
  "#E350E0",
  "#50E35C",
];

const BarChart: FC<BarChartProps> = ({ title, data, icon: Icon }) => {
  // Prepare data for Recharts, sorted by value
  const chartData = data
    .slice(0, 8)
    .sort((first, second) => second.value - first.value)
    .map((item, index) => ({
      name: item.label,
      value: item.value,
      percentage: item.percentage,
      fill: colors[index % colors.length],
    }));

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-smoke-900 dark:bg-smoke-100 text-smoke-100 dark:text-smoke-900 text-xs px-3 py-2 rounded-lg shadow-lg border border-smoke-700 dark:border-smoke-300">
          <div className="font-semibold">{label}</div>
          <div className="text-smoke-400 dark:text-smoke-600">
            {data.value.toLocaleString()} ({data.percentage.toFixed(1)}%)
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-smoke-0 dark:bg-smoke-950 rounded-xl border border-smoke-200 dark:border-smoke-800 p-4">
      <h3 className="text-lg font-semibold text-smoke-900 dark:text-smoke-100 mb-4 flex items-center gap-3">
        {Icon && (
          <div className="p-2 rounded-lg bg-smoke-100 dark:bg-smoke-800 text-smoke-600 dark:text-smoke-400">
            <Icon size={20} />
          </div>
        )}
        {title}
      </h3>

      <div className="h-56 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsBarChart
            data={chartData}
            margin={{
              top: 5,
              right: 5,
              left: 5,
              bottom: 15,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              className="opacity-30"
              stroke="currentColor"
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{
                fontSize: 11,
                fill: "currentColor",
                className: "text-smoke-600 dark:text-smoke-400",
              }}
              interval={0}
              angle={-45}
              textAnchor="end"
              height={30}
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
            <Bar dataKey="value" radius={[4, 4, 0, 0]} />
          </RechartsBarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BarChart;
