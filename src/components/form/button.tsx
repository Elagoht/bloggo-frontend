import { Component, JSX } from "solid-js";
import classNames from "classnames";

interface ButtonProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: "primary" | "danger" | "success";
}

const Button: Component<ButtonProps> = ({ color = "primary", ...props }) => {
  return (
    <button
      {...props}
      class={classNames(
        "p-2 text-xs rounded cursor-pointer transition-all ease-in-out focus:outline-none",
        props.class,
        {
          "bg-gopher-500 text-gopher-50 focus:outline-gopher-500":
            color === "primary",
          "bg-danger-500 text-danger-50 focus:outline-danger-500":
            color === "danger",
          "bg-success-500 text-smoke-50 focus:outline-smoke-500":
            color === "success",
        }
      )}
    />
  );
};

export default Button;
