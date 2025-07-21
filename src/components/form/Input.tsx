import { Component, JSX } from "solid-js";
import classNames from "classnames";

interface InputProps extends JSX.InputHTMLAttributes<HTMLInputElement> {}

const Input: Component<InputProps> = (props) => {
  return (
    <input
      {...props}
      class={classNames(
        "h-8 p-2 rounded text-sm bg-smoke-50 text-smoke-950 dark:bg-smoke-900 dark:text-smoke-100 transition-all ease-in-out focus:outline-none focus:outline-smoke-300 dark:focus:outline-smoke-700",
        props.class
      )}
    />
  );
};

export default Input;
