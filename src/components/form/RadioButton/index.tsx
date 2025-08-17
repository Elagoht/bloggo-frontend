import { Component, JSX } from "solid-js";
import classNames from "classnames";

type RadioButtonProps = JSX.InputHTMLAttributes<HTMLInputElement> & {
  type?: "radio";
  label: string;
};

const RadioButton: Component<RadioButtonProps> = ({ label, ...props }) => {
  return (
    <label class="flex items-center gap-2 p-0.5">
      <input
        {...props}
        type="radio"
        class={classNames(
          "bg-smoke-200 dark:bg-smoke-800 appearance-none size-[1.125rem] rounded-full after:block after:size-3  after:m-[0.1875rem] after:rounded-full after:transition-all checked:bg-gopher-300 checked:dark:bg-gopher-800 checked:after:bg-gopher-500 transition-all",
          props.class
        )}
      />

      <span class="text-sm">{label}</span>
    </label>
  );
};

export default RadioButton;
