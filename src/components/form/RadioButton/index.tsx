import React from "react";
import classNames from "classnames";

type RadioButtonProps = React.InputHTMLAttributes<HTMLInputElement> & {
  type?: "radio";
  label: string;
};

const RadioButton: React.FC<RadioButtonProps> = ({ label, ...props }) => {
  return (
    <label className="flex items-center gap-2 p-0.5">
      <input
        {...props}
        type="radio"
        className={classNames(
          "bg-smoke-200 dark:bg-smoke-800 appearance-none size-[1.125rem] rounded-full after:block after:size-3  after:m-[0.1875rem] after:rounded-full after:transition-all checked:bg-gopher-300 checked:dark:bg-gopher-800 checked:after:bg-gopher-500 transition-all",
          props.className
        )}
      />

      <span className="text-sm">{label}</span>
    </label>
  );
};

export default RadioButton;
