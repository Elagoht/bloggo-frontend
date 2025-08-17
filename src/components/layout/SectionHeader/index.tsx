import { Component, ParentProps } from "solid-js";
import classNames from "classnames";

type SectionHeaderProps = ParentProps<{
  icon?: Component;
  color?: "default" | "primary" | "success" | "danger";
}>;

const SectionHeader: Component<SectionHeaderProps> = ({
  children,
  icon,
  color = "default",
}) => {
  return (
    <hgroup class="flex items-center gap-2">
      {icon && (
        <span
          class={classNames("flex-shrink-0 p-1 rounded border", {
            // Default
            "bg-smoke-300 dark:bg-smoke-700 border-smoke-400 dark:border-smoke-600":
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
          })}
        >
          {icon({
            size: 16,
            class: classNames({
              // Default
              "text-smoke-700 dark:text-smoke-200": color === "default",
              // Primary
              "text-gopher-700 dark:text-gopher-200": color === "primary",
              // Success
              "text-success-700 dark:text-success-200": color === "success",
              // Danger
              "text-danger-700 dark:text-danger-200": color === "danger",
            }),
          })}
        </span>
      )}

      <h2
        class={classNames("text-base font-semibold", {
          // Default
          "text-smoke-900 dark:text-smoke-50": color === "default",
          // Primary
          "text-gopher-900 dark:text-gopher-50": color === "primary",
          // Success
          "text-success-900 dark:text-success-50": color === "success",
          // Danger
          "text-danger-900 dark:text-danger-50": color === "danger",
        })}
      >
        {children}
      </h2>
    </hgroup>
  );
};

export default SectionHeader;
