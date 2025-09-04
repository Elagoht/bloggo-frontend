import { Icon, IconProps } from "@tabler/icons-react";
import classNames from "classnames";
import {
  createElement,
  FC,
  ForwardRefExoticComponent,
  RefAttributes,
} from "react";

type SelectOption = {
  value: string | number;
  label: string;
  selected?: boolean;
};

type SelectProps = {
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  icon?: ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>;
  options: SelectOption[];
  defaultValue?: string | number;
};

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
          disabled={options.length === 0 || disabled}
          defaultValue={defaultValue}
          className={classNames(
            "w-full px-2.5 py-2 text-sm bg-smoke-50 dark:bg-smoke-900 border border-smoke-200 dark:border-smoke-700 rounded-lg transition-all duration-200 focus:outline-none focus:border-gopher-400 dark:focus:border-gopher-500 focus:ring-1 focus:ring-gopher-200 dark:focus:ring-gopher-800/50 placeholder:text-smoke-400 dark:placeholder:text-smoke-500 text-smoke-900 dark:text-smoke-100 shadow-sm focus:shadow hover:border-smoke-300 dark:hover:border-smoke-600",
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

          {options.length === 0 && (
            <option disabled selected>
              -
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
