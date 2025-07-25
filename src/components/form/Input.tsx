import { Component, JSX } from "solid-js";
import classNames from "classnames";

interface InputProps extends JSX.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input: Component<InputProps> = ({ label, ...props }) => {
  const input = (
    <input
      {...props}
      class={classNames(
        "p-2 rounded text-sm bg-smoke-200 text-smoke-950 dark:bg-smoke-900 dark:text-smoke-100 transition-all ease-in-out focus:outline-none focus:outline-smoke-300 dark:focus:outline-smoke-700 placeholder:text-smoke-500",
        {
          "h-8": props.type !== "file",
          "h-[2.375rem]": props.type === "file",
        },
        props.class
      )}
    />
  );

  return label ? (
    <label class="flex flex-col gap-0.5">
      <span class="text-sm">{label}</span>

      {input}
    </label>
  ) : (
    input
  );
};

export default Input;
