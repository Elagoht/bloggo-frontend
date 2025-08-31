import { Icon, IconProps } from "@tabler/icons-react";
import { FC, ForwardRefExoticComponent, RefAttributes } from "react";

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
  const maxValue = Math.max(...data.map((item) => item.value));

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

      <ul className="space-y-1">
        {data
          .slice(0, 8)
          .sort((first, second) => second.value - first.value)
          .map((item, index) => (
            <li key={item.label}>
              <div className="flex justify-between items-center">
                <span className="text-sm text-smoke-700 dark:text-smoke-300 truncate">
                  {item.label}
                </span>

                <data className="text-right">
                  <span className="text-sm font-medium text-smoke-900 dark:text-smoke-100">
                    {item.value.toLocaleString()}
                  </span>{" "}
                  <small className="text-smoke-500 dark:text-smoke-400">
                    ({item.percentage.toFixed(1)}%)
                  </small>
                </data>
              </div>

              <div className="w-full bg-smoke-200 dark:bg-smoke-800 rounded-full h-2">
                <div
                  className="h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${(item.value / maxValue) * 100}%`,
                    backgroundColor: colors[index % colors.length],
                  }}
                />
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default BarChart;
