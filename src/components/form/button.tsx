import { Component, JSX } from "solid-js";
import classNames from "classnames";
import { A, AnchorProps } from "@solidjs/router";

interface ButtonProps<T extends boolean = false> {
  color?: "primary" | "danger" | "success";
  href?: T extends true ? string : never;
  class?: string;
}

type ButtonComponentProps<T extends boolean> = T extends true
  ? ButtonProps<true> & AnchorProps
  : ButtonProps<false> & JSX.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: Component<ButtonComponentProps<boolean>> = ({
  color = "primary",
  href,
  ...props
}) => {
  const classes = classNames(
    "p-2 text-xs rounded cursor-pointer transition-all ease-in-out focus:outline-none flex items-center justify-center gap-2 text-center",
    props.class,
    {
      "bg-gopher-500 text-gopher-50 focus:outline-gopher-500":
        color === "primary",
      "bg-danger-500 text-danger-50 focus:outline-danger-500":
        color === "danger",
      "bg-success-500 text-smoke-50 focus:outline-smoke-500":
        color === "success",
    }
  );

  return href ? (
    <A {...(props as AnchorProps)} href={href} class={classes} />
  ) : (
    <button
      {...(props as JSX.ButtonHTMLAttributes<HTMLButtonElement>)}
      class={classes}
    />
  );
};

export default Button;
