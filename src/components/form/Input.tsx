import React from "react";
import classNames from "classnames";
import { Icon, IconProps } from "@tabler/icons-react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  iconLeft?: React.ForwardRefExoticComponent<
    IconProps & React.RefAttributes<Icon>
  >;
  iconRight?: React.ForwardRefExoticComponent<
    IconProps & React.RefAttributes<Icon>
  >;
}

const Input: React.FC<InputProps> = ({
  label,
  iconLeft: IconLeft,
  iconRight: IconRight,
  className,
  ...props
}) => {
  const hasIcons = IconLeft || IconRight;

  const input = hasIcons ? (
    <div className="relative">
      {IconLeft && (
        <div className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-smoke-400 dark:text-smoke-500 pointer-events-none">
          <IconLeft size={16} />
        </div>
      )}
      <input
        {...props}
        className={classNames(
          "w-full px-2.5 py-2 text-sm bg-smoke-50 dark:bg-smoke-900 border border-smoke-200 dark:border-smoke-700 rounded-lg transition-all duration-200 focus:outline-none focus:border-gopher-400 dark:focus:border-gopher-500 focus:ring-1 focus:ring-gopher-200 dark:focus:ring-gopher-800/50 placeholder:text-smoke-400 dark:placeholder:text-smoke-500 text-smoke-900 dark:text-smoke-100 shadow-sm focus:shadow hover:border-smoke-300 dark:hover:border-smoke-600",
          {
            "h-8": props.type !== "file",
            "h-[2.375rem]": props.type === "file",
            "pl-8": IconLeft,
            "pr-8": IconRight,
          },
          className
        )}
      />
      {IconRight && (
        <div className="absolute right-2.5 top-1/2 transform -translate-y-1/2 text-smoke-400 dark:text-smoke-500 pointer-events-none">
          <IconRight size={16} />
        </div>
      )}
    </div>
  ) : (
    <input
      {...props}
      className={classNames(
        "w-full px-2.5 py-2 text-sm bg-smoke-50 dark:bg-smoke-900 border border-smoke-200 dark:border-smoke-700 rounded-lg transition-all duration-200 focus:outline-none focus:border-gopher-400 dark:focus:border-gopher-500 focus:ring-1 focus:ring-gopher-200 dark:focus:ring-gopher-800/50 placeholder:text-smoke-400 dark:placeholder:text-smoke-500 text-smoke-900 dark:text-smoke-100 shadow-sm focus:shadow hover:border-smoke-300 dark:hover:border-smoke-600",
        {
          "h-8": props.type !== "file",
          "h-[2.375rem]": props.type === "file",
        },
        className
      )}
    />
  );

  return label ? (
    <label className="flex flex-col gap-1">
      <span className="text-sm font-medium text-smoke-700 dark:text-smoke-300">{label}</span>
      {input}
    </label>
  ) : (
    input
  );
};

export default Input;
