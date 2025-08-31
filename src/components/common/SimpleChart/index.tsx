import { Icon, IconProps } from "@tabler/icons-react";
import { FC, ForwardRefExoticComponent, RefAttributes } from "react";

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

const SimpleChart: FC<SimpleChartProps> = ({
  title,
  data,
  type = "bar",
  icon: Icon,
}) => {
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
          className="transition-all duration-200 hover:opacity-80 origin-center hover:scale-110 stroke-smoke-0 dark:stroke-smoke-950"
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
        className="transition-all duration-200 hover:opacity-80 origin-center hover:scale-110 stroke-smoke-0 dark:stroke-smoke-950"
      />
    );
  };

  if (type === "pie") {
    let currentAngle = -90; // Start from top

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

        <div className="flex flex-col items-center gap-4">
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
          <ul className="flex flex-col w-full">
            {data.slice(0, 8).map((item, index) => (
              <li key={item.label} className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: colors[index % colors.length] }}
                />

                <span className="text-sm text-smoke-700 dark:text-smoke-300 grow leading-tight">
                  {item.label}
                </span>

                <data className="text-right flex-shrink-0">
                  <span className="text-sm font-medium text-smoke-900 dark:text-smoke-100">
                    {item.value.toLocaleString()}
                  </span>{" "}
                  <small className="text-smoke-500 dark:text-smoke-400">
                    ({item.percentage.toFixed(1)}%)
                  </small>
                </data>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

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
        {data.slice(0, 8).map((item, index) => (
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

export default SimpleChart;
