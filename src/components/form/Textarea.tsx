import { Icon, IconProps } from "@tabler/icons-react";
import classNames from "classnames";
import {
  createElement,
  FC,
  ForwardRefExoticComponent,
  RefAttributes,
  TextareaHTMLAttributes,
} from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  iconLeft?: ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>;
  iconRight?: ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>;
  rows?: number;
}

const Textarea: FC<TextareaProps> = ({
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
        <div className="absolute left-2.5 top-2.5 text-smoke-400 dark:text-smoke-500 pointer-events-none">
          {createElement(iconLeft, { size: 16 })}
        </div>
      )}

      <textarea
        {...props}
        rows={rows}
        className={classNames(
          "w-full px-2.5 py-2 text-sm bg-smoke-50 dark:bg-smoke-900 border border-smoke-200 dark:border-smoke-700 rounded-lg transition-all duration-200 focus:outline-none focus:border-gopher-400 dark:focus:border-gopher-500 focus:ring-1 focus:ring-gopher-200 dark:focus:ring-gopher-800/50 placeholder:text-smoke-400 dark:placeholder:text-smoke-500 text-smoke-900 dark:text-smoke-100 shadow-sm focus:shadow hover:border-smoke-300 dark:hover:border-smoke-600 resize-y min-h-[5rem]",
          {
            "pl-8": iconLeft,
            "pr-8": iconRight,
          },
          className
        )}
      />

      {iconRight && (
        <div className="absolute right-2.5 top-2.5 text-smoke-400 dark:text-smoke-500 pointer-events-none">
          {createElement(iconRight, { size: 16 })}
        </div>
      )}
    </div>
  ) : (
    <textarea
      {...props}
      rows={rows}
      className={classNames(
        "w-full px-2.5 py-2 text-sm bg-smoke-50 dark:bg-smoke-900 border border-smoke-200 dark:border-smoke-700 rounded-lg transition-all duration-200 focus:outline-none focus:border-gopher-400 dark:focus:border-gopher-500 focus:ring-1 focus:ring-gopher-200 dark:focus:ring-gopher-800/50 placeholder:text-smoke-400 dark:placeholder:text-smoke-500 text-smoke-900 dark:text-smoke-100 shadow-sm focus:shadow hover:border-smoke-300 dark:hover:border-smoke-600 resize-y min-h-[5rem]",
        className
      )}
    />
  );

  return label ? (
    <label className="flex flex-col gap-1">
      <span className="text-sm font-medium text-smoke-700 dark:text-smoke-300">
        {label}
      </span>
      {textarea}
    </label>
  ) : (
    textarea
  );
};

export default Textarea;
