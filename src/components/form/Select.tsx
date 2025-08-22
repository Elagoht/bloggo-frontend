import { Icon, IconProps } from "@tabler/icons-react";
import classNames from "classnames";
import {
  createElement,
  FC,
  ForwardRefExoticComponent,
  RefAttributes,
} from "react";

interface SelectOption {
  value: string | number;
  label: string;
  selected?: boolean;
}

interface SelectProps {
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  icon?: ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>;
  options: SelectOption[];
  defaultValue?: string | number;
}

const Select: FC<SelectProps> = ({
  name,
  label,
  placeholder,
  required,
  disabled,
  className,
  icon,
  options,
  defaultValue,
}) => {
  return (
    <div className={className}>
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-smoke-700 dark:text-smoke-300 mb-2"
        >
          {label}

          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {createElement(icon, {
              size: 20,
              className: "text-smoke-400 dark:text-smoke-500",
            })}
          </div>
        )}

        <select
          id={name}
          name={name}
          required={required}
          disabled={disabled}
          defaultValue={defaultValue}
          className={classNames(
            "block w-full rounded-lg border border-smoke-300 dark:border-smoke-600 bg-white dark:bg-smoke-900 text-smoke-900 dark:text-smoke-100 placeholder-smoke-400 dark:placeholder-smoke-500 focus:ring-2 focus:ring-gopher-500 focus:border-gopher-500 dark:focus:ring-gopher-400 dark:focus:border-gopher-400 disabled:bg-smoke-50 dark:disabled:bg-smoke-800 disabled:text-smoke-500 dark:disabled:text-smoke-400",
            {
              "pl-10 pr-3 py-2": icon,
              "px-3 py-2": icon,
            }
          )}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option, index) => (
            <option key={index} value={option.value} selected={option.selected}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Select;
