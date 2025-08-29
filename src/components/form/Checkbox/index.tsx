import classNames from "classnames";
import { FC, InputHTMLAttributes } from "react";

type CheckboxProps = InputHTMLAttributes<HTMLInputElement> & {
  type?: "checkbox";
  label: string;
};

const Checkbox: FC<CheckboxProps> = ({ label, ...props }) => {
  return (
    <label className="flex items-center gap-2 py-1 px-2 rounded hover:bg-smoke-50 dark:hover:bg-smoke-900/50 transition-all duration-200 cursor-pointer group">
      <input
        {...props}
        type="checkbox"
        className={classNames(
          "appearance-none size-4 rounded border border-smoke-300 dark:border-smoke-600 bg-smoke-50 dark:bg-smoke-900 transition-all duration-200 checked:border-gopher-500 checked:bg-gopher-500 hover:border-smoke-400 dark:hover:border-smoke-500 focus:outline-none focus:ring-2 focus:ring-gopher-200 dark:focus:ring-gopher-800/50 relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:transform before:-translate-x-1/2 before:-translate-y-1/2 before:text-white before:text-xs before:font-bold before:opacity-0 before:transition-opacity before:duration-200 checked:before:opacity-100 checked:before:content-['✓']",
          props.className
        )}
      />

      <span className="text-sm text-smoke-700 dark:text-smoke-300 group-hover:text-smoke-900 dark:group-hover:text-smoke-100 transition-colors duration-200">
        {label}
      </span>
    </label>
  );
};

export default Checkbox;
