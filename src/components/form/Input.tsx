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
        <div className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-smoke-500 dark:text-smoke-400 pointer-events-none">
          <IconLeft size={18} />
        </div>
      )}
      <input
        {...props}
        className={classNames(
          "p-2 rounded text-sm bg-smoke-200 text-smoke-950 dark:bg-smoke-900 dark:text-smoke-100 transition-all ease-in-out focus:outline-none focus:outline-smoke-300 dark:focus:outline-smoke-700 placeholder:text-smoke-500 w-full",
          {
            "h-8": props.type !== "file",
            "h-[2.375rem]": props.type === "file",
            "pl-9": IconLeft,
            "pr-9": IconRight,
          },
          className
        )}
      />
      {IconRight && (
        <div className="absolute right-2.5 top-1/2 transform -translate-y-1/2 text-smoke-500 dark:text-smoke-400 pointer-events-none">
          <IconRight size={18} />
        </div>
      )}
    </div>
  ) : (
    <input
      {...props}
      className={classNames(
        "p-2 rounded text-sm bg-smoke-200 text-smoke-950 dark:bg-smoke-900 dark:text-smoke-100 transition-all ease-in-out focus:outline-none focus:outline-smoke-300 dark:focus:outline-smoke-700 placeholder:text-smoke-500",
        {
          "h-8": props.type !== "file",
          "h-[2.375rem]": props.type === "file",
        },
        className
      )}
    />
  );

  return label ? (
    <label className="flex flex-col gap-0.5">
      <span className="text-sm">{label}</span>
      {input}
    </label>
  ) : (
    input
  );
};

export default Input;
