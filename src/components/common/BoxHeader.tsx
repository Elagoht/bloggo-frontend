import { FC, ReactNode } from "react";
import classNames from "classnames";

type ColorVariant = "gopher" | "success" | "warning" | "danger" | "smoke";

type BoxHeaderProps = {
  icon: ReactNode;
  title: string;
  variant?: ColorVariant;
  className?: string;
};

const colorVariants: Record<ColorVariant, { bg: string; iconColor: string }> = {
  gopher: {
    bg: "bg-gopher-100 dark:bg-gopher-900/30",
    iconColor: "text-gopher-600 dark:text-gopher-400",
  },
  success: {
    bg: "bg-success-100 dark:bg-success-900/30",
    iconColor: "text-success-600 dark:text-success-400",
  },
  warning: {
    bg: "bg-warning-100 dark:bg-warning-900/30",
    iconColor: "text-warning-600 dark:text-warning-400",
  },
  danger: {
    bg: "bg-danger-100 dark:bg-danger-900/30",
    iconColor: "text-danger-600 dark:text-danger-400",
  },
  smoke: {
    bg: "bg-smoke-100 dark:bg-smoke-800",
    iconColor: "text-smoke-600 dark:text-smoke-400",
  },
};

const BoxHeader: FC<BoxHeaderProps> = ({
  icon,
  title,
  variant = "gopher",
  className,
}) => {
  const colors = colorVariants[variant];

  return (
    <div className={classNames("flex items-center gap-3 mb-5", className)}>
      <div className={classNames("p-2 rounded-lg", colors.bg)}>
        <div className={classNames("h-5 w-5", colors.iconColor)}>{icon}</div>
      </div>
      <h3 className="text-lg font-semibold text-smoke-900 dark:text-smoke-100">
        {title}
      </h3>
    </div>
  );
};

export default BoxHeader;
