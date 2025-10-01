import { Icon, IconProps } from "@tabler/icons-react";
import classNames from "classnames";
import { FC, ForwardRefExoticComponent, RefAttributes } from "react";

type StatCardProps = {
  title: string;
  value: string | number;
  icon?: ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: "primary" | "success" | "warning" | "danger";
};

const StatCard: FC<StatCardProps> = ({
  title,
  value,
  icon: Icon,
  description,
  trend,
  color = "primary",
}) => {
  const colorClasses = {
    primary:
      "text-gopher-600 dark:text-gopher-400 bg-gopher-100 dark:bg-gopher-900",
    success:
      "text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900",
    warning:
      "text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900",
    danger: "text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900",
  };

  return (
    <div className="bg-smoke-0 dark:bg-smoke-950 rounded-xl border border-smoke-200 dark:border-smoke-800 p-4">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            {Icon && (
              <div
                className={classNames("p-2 rounded-lg", colorClasses[color])}
              >
                <Icon size={20} />
              </div>
            )}
            <h3 className="text-sm font-medium text-smoke-500 dark:text-smoke-400 uppercase tracking-wide">
              {title}
            </h3>
          </div>

          <div className="flex items-baseline gap-2">
            <p className="text-2xl font-bold text-smoke-900 dark:text-smoke-100">
              {typeof value === "number" ? value.toLocaleString() : value}
            </p>

            {trend && (
              <span
                className={classNames(
                  "text-xs font-medium px-2 py-1 rounded-full",
                  {
                    "text-green-700 bg-green-100 dark:text-green-300 dark:bg-green-900":
                      trend.isPositive,
                    "text-red-700 bg-red-100 dark:text-red-300 dark:bg-red-900":
                      !trend.isPositive,
                  }
                )}
              >
                {trend.isPositive ? "+" : ""}
                {trend.value}%
              </span>
            )}
          </div>

          {description && (
            <p className="text-sm text-smoke-500 dark:text-smoke-400 mt-1">
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
