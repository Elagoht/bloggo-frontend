import { Icon, IconProps } from "@tabler/icons-react";
import { FC, ForwardRefExoticComponent, RefAttributes } from "react";
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import NoDataRecorded from "../NoDataRecorded";

type ChartDataItem = {
  label: string;
  value: number;
  percentage: number;
  color?: string;
};

type PieChartProps = {
  title: string;
  data: ChartDataItem[];
  icon?: ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>;
};

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

const PieChart: FC<PieChartProps> = ({ title, data, icon: Icon }) => {
  // Prepare data for Recharts, sorted by value
  const chartData = data
    ?.slice?.(0, 8)
    ?.sort?.((first, second) => second.value - first.value)
    ?.map?.((item, index) => ({
      name: item.label,
      value: item.value,
      percentage: item.percentage,
      fill: colors[index % colors.length],
    }));

  // Custom tooltip component
  const CustomTooltip = ({
    active,
    payload,
  }: {
    active?: boolean;
    payload?: Array<{
      payload: { name: string; value: number; percentage: number };
    }>;
  }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-smoke-900 dark:bg-smoke-100 text-smoke-100 dark:text-smoke-900 text-xs px-3 py-2 rounded-lg shadow-lg border border-smoke-700 dark:border-smoke-300">
          <div className="font-semibold">{data.name}</div>
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

      {!data || data.length === 0 ? (
        <NoDataRecorded />
      ) : (
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsPieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={90}
                dataKey="value"
                strokeWidth={0}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>

              <Tooltip content={CustomTooltip} />

              <Legend
                verticalAlign="bottom"
                wrapperStyle={{ paddingTop: "20px" }}
              />
            </RechartsPieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default PieChart;
