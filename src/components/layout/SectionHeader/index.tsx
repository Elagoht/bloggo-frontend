import React from "react";
import classNames from "classnames";
import { Icon, IconProps } from "@tabler/icons-react";

type SectionHeaderProps = {
  children: React.ReactNode;
  icon?: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<Icon>>;
  color?: "default" | "primary" | "success" | "danger" | "warning";
};

const SectionHeader: React.FC<SectionHeaderProps> = ({
  children,
  icon: Icon,
  color = "default",
}) => {
  return (
    <hgroup className="flex items-center gap-2">
      {Icon && (
        <span
          className={classNames("flex-shrink-0 p-1 rounded border", {
            // Default
            "bg-gray-300 dark:bg-gray-700 border-gray-400 dark:border-gray-600":
              color === "default",
            // Primary
            "bg-gopher-200 dark:bg-gopher-800 border-gopher-300 dark:border-gopher-700":
              color === "primary",
            // Success
            "bg-success-200 dark:bg-success-800 border-success-300 dark:border-success-700":
              color === "success",
            // Danger
            "bg-danger-200 dark:bg-danger-800 border-danger-300 dark:border-danger-700":
              color === "danger",
            // Warning
            "bg-warning-200 dark:bg-warning-800 border-warning-300 dark:border-warning-700":
              color === "warning",
          })}
        >
          <Icon
            size={16}
            className={classNames({
              // Default
              "text-gray-700 dark:text-gray-200": color === "default",
              // Primary
              "text-gopher-700 dark:text-gopher-200": color === "primary",
              // Success
              "text-success-700 dark:text-success-200": color === "success",
              // Danger
              "text-danger-700 dark:text-danger-200": color === "danger",
              // Warning
              "text-warning-700 dark:text-warning-200": color === "warning",
            })}
          />
        </span>
      )}

      <h2
        className={classNames("text-base font-semibold", {
          // Default
          "text-gray-900 dark:text-gray-50": color === "default",
          // Primary
          "text-gopher-900 dark:text-gopher-50": color === "primary",
          // Success
          "text-success-900 dark:text-success-50": color === "success",
          // Danger
          "text-danger-900 dark:text-danger-50": color === "danger",
          // Warning
          "text-warning-900 dark:text-warning-50": color === "warning",
        })}
      >
        {children}
      </h2>
    </hgroup>
  );
};

export default SectionHeader;
