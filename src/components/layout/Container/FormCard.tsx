import React from "react";
import classNames from "classnames";

type FormCardProps = {
  children: React.ReactNode;
  color?: "default" | "primary" | "success" | "danger" | "warning";
};

const FormCard: React.FC<FormCardProps> = ({ children, color = "default" }) => {
  return (
    <article
      className={classNames("rounded-lg border p-3 flex flex-col gap-3", {
        // Default
        "bg-white dark:bg-smoke-950 border-smoke-200 dark:border-smoke-800":
          color === "default",
        // Primary
        "bg-gopher-50 dark:bg-gopher-950 border-gopher-200 dark:border-gopher-800":
          color === "primary",
        // Success
        "bg-success-50 dark:bg-success-950 border-success-200 dark:border-success-800":
          color === "success",
        // Danger
        "bg-danger-50 dark:bg-danger-950 border-danger-200 dark:border-danger-800":
          color === "danger",
        // Warning
        "bg-warning-50 dark:bg-warning-950 border-warning-200 dark:border-warning-800":
          color === "warning",
      })}
    >
      {children}
    </article>
  );
};

export default FormCard;
