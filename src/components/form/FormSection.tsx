import classNames from "classnames";
import { FC, PropsWithChildren } from "react";

type FormSectionProps = PropsWithChildren & {
  legend: string;
  color?: "default" | "primary" | "success" | "danger";
};

const FormSection: FC<FormSectionProps> = ({
  legend,
  children,
  color = "default",
}) => {
  return (
    <fieldset>
      <legend
        className={classNames("leading-normal text-sm font-semibold", {
          // Default
          "text-smoke-500": color === "default",
          // Primary
          "text-gopher-600 dark:text-gopher-400": color === "primary",
          // Success
          "text-success-600 dark:text-success-400": color === "success",
          // Danger
          "text-danger-600 dark:text-danger-400": color === "danger",
        })}
      >
        {legend}
      </legend>

      <section className="flex flex-col gap-4">{children}</section>
    </fieldset>
  );
};

export default FormSection;
