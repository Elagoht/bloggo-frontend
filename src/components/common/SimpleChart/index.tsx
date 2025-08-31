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
  type?: "bar" | "pie";
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

const SimpleChart: FC<SimpleChartProps> = ({ title, data, type = "bar" }) => {
  const maxValue = Math.max(...data.map((item) => item.value));

  // Generate SVG path for pie slice
  const createPieSlice = (
    percentage: number,
    startAngle: number,
    color: string,
    index: number
  ) => {
    const radius = 80;
    const centerX = 100;
    const centerY = 100;

    // Handle 100% case - draw a full circle
    if (percentage >= 100) {
      return (
        <circle
          key={index}
          cx={centerX}
          cy={centerY}
          r={radius}
          fill={color}
          strokeWidth="2"
          className="transition-all duration-200 hover:opacity-80 origin-center hover:scale-110 stroke-smoke-900 dark:stroke-smoke-100"
        />
      );
    }

    const angle = (percentage / 100) * 360;
    const endAngle = startAngle + angle;

    const startAngleRad = (startAngle * Math.PI) / 180;
    const endAngleRad = (endAngle * Math.PI) / 180;

    const largeArcFlag = angle > 180 ? 1 : 0;

    const x1 = centerX + radius * Math.cos(startAngleRad);
    const y1 = centerY + radius * Math.sin(startAngleRad);
    const x2 = centerX + radius * Math.cos(endAngleRad);
    const y2 = centerY + radius * Math.sin(endAngleRad);

    const pathData = `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;

    return (
      <path
        key={index}
        d={pathData}
        fill={color}
        stroke="white"
        strokeWidth="2"
        className="transition-all duration-200 hover:opacity-80 origin-center hover:scale-110 stroke-smoke-900 dark:stroke-smoke-100"
      />
    );
  };

  if (type === "pie") {
    let currentAngle = -90; // Start from top

    return (
      <div className="bg-smoke-0 dark:bg-smoke-950 rounded-xl border border-smoke-200 dark:border-smoke-800 p-6">
        <h3 className="text-lg font-semibold text-smoke-900 dark:text-smoke-100 mb-4">
          {title}
        </h3>
        <div className="flex flex-col items-center gap-6">
          {/* SVG Pie Chart */}
          <div className="flex-shrink-0">
            <svg
              width="200"
              height="200"
              viewBox="0 0 200 200"
              className="drop-shadow-sm"
            >
              {data.slice(0, 8).map((item, index) => {
                const slice = createPieSlice(
                  item.percentage,
                  currentAngle,
                  colors[index % colors.length],
                  index
                );
                currentAngle += (item.percentage / 100) * 360;
                return slice;
              })}
            </svg>
          </div>

          {/* Legend */}
          <div className="w-full">
            <div className="grid grid-cols-1 gap-3">
              {data.slice(0, 8).map((item, index) => (
                <div key={item.label} className="flex items-start gap-3">
                  <div
                    className="w-3 h-3 rounded-full flex-shrink-0 mt-0.5"
                    style={{ backgroundColor: colors[index % colors.length] }}
                  />
                  <div className="flex-1 flex justify-between items-start gap-3">
                    <span className="text-sm text-smoke-700 dark:text-smoke-300 leading-tight">
                      {item.label}
                    </span>
                    <div className="text-right flex-shrink-0">
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
                className="h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${(item.value / maxValue) * 100}%`,
                  backgroundColor: colors[index % colors.length],
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimpleChart;
