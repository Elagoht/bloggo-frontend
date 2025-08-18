import React from "react";
import classNames from "classnames";
import { Icon, IconProps } from "@tabler/icons-react";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  iconLeft?: React.ForwardRefExoticComponent<
    IconProps & React.RefAttributes<Icon>
  >;
  iconRight?: React.ForwardRefExoticComponent<
    IconProps & React.RefAttributes<Icon>
  >;
  rows?: number;
}

const Textarea: React.FC<TextareaProps> = ({
  label,
  iconLeft,
  iconRight,
  rows = 4,
  className,
  ...props
}) => {
  const hasIcons = iconLeft || iconRight;

  const textarea = hasIcons ? (
    <div className="relative">
      {iconLeft && (
        <div className="absolute left-2.5 top-3 text-smoke-500 dark:text-smoke-400 pointer-events-none">
          {React.createElement(iconLeft, { size: 18 })}
        </div>
      )}

      <textarea
        {...props}
        rows={rows}
        className={classNames(
          "p-2 rounded text-sm bg-smoke-200 text-smoke-950 dark:bg-smoke-900 dark:text-smoke-100 transition-all ease-in-out focus:outline-none focus:outline-smoke-300 dark:focus:outline-smoke-700 placeholder:text-smoke-500 w-full resize-y min-h-[6rem]",
          {
            "pl-9": iconLeft,
            "pr-9": iconRight,
          },
          className
        )}
      />

      {iconRight && (
        <div className="absolute right-2.5 top-3 text-smoke-500 dark:text-smoke-400 pointer-events-none">
          {React.createElement(iconRight, { size: 18 })}
        </div>
      )}
    </div>
  ) : (
    <textarea
      {...props}
      rows={rows}
      className={classNames(
        "p-2 rounded text-sm bg-smoke-200 text-smoke-950 dark:bg-smoke-900 dark:text-smoke-100 transition-all ease-in-out focus:outline-none focus:outline-smoke-300 dark:focus:outline-smoke-700 placeholder:text-smoke-500 resize-y min-h-[6rem]",
        className
      )}
    />
  );

  return label ? (
    <label className="flex flex-col gap-0.5">
      <span className="text-sm">{label}</span>
      {textarea}
    </label>
  ) : (
    textarea
  );
};

export default Textarea;
