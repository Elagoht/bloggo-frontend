import { FC } from "react";

interface ChartDataItem {
  label: string;
  value: number;
  percentage: number;
  color?: string;
}

interface SimpleChartProps {
  title: string;
  data: ChartDataItem[];
  type?: "bar" | "donut";
}

const colors = [
  "bg-gopher-500",
  "bg-blue-500", 
  "bg-green-500",
  "bg-yellow-500",
  "bg-red-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-indigo-500",
];

const SimpleChart: FC<SimpleChartProps> = ({ title, data, type = "bar" }) => {
  const maxValue = Math.max(...data.map(item => item.value));

  if (type === "donut") {
    return (
      <div className="bg-smoke-0 dark:bg-smoke-950 rounded-xl border border-smoke-200 dark:border-smoke-800 p-6">
        <h3 className="text-lg font-semibold text-smoke-900 dark:text-smoke-100 mb-4">
          {title}
        </h3>
        <div className="space-y-3">
          {data.slice(0, 8).map((item, index) => (
            <div key={item.label} className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${colors[index % colors.length]}`} />
              <div className="flex-1 flex justify-between items-center">
                <span className="text-sm text-smoke-700 dark:text-smoke-300 truncate">
                  {item.label}
                </span>
                <div className="text-right">
                  <span className="text-sm font-medium text-smoke-900 dark:text-smoke-100">
                    {item.value.toLocaleString()}
                  </span>
                  <span className="text-xs text-smoke-500 dark:text-smoke-400 ml-2">
                    ({item.percentage.toFixed(1)}%)
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-smoke-0 dark:bg-smoke-950 rounded-xl border border-smoke-200 dark:border-smoke-800 p-6">
      <h3 className="text-lg font-semibold text-smoke-900 dark:text-smoke-100 mb-4">
        {title}
      </h3>
      <div className="space-y-3">
        {data.slice(0, 8).map((item, index) => (
          <div key={item.label} className="space-y-1">
            <div className="flex justify-between items-center">
              <span className="text-sm text-smoke-700 dark:text-smoke-300 truncate">
                {item.label}
              </span>
              <div className="text-right">
                <span className="text-sm font-medium text-smoke-900 dark:text-smoke-100">
                  {item.value.toLocaleString()}
                </span>
                <span className="text-xs text-smoke-500 dark:text-smoke-400 ml-2">
                  ({item.percentage.toFixed(1)}%)
                </span>
              </div>
            </div>
            <div className="w-full bg-smoke-200 dark:bg-smoke-800 rounded-full h-2">
              <div 
                className={`${colors[index % colors.length]} h-2 rounded-full transition-all duration-300`}
                style={{ width: `${(item.value / maxValue) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimpleChart;