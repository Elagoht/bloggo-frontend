import { Icon, IconProps } from "@tabler/icons-react";
import classNames from "classnames";
import {
  ButtonHTMLAttributes,
  createElement,
  FC,
  ForwardRefExoticComponent,
  PropsWithChildren,
  RefAttributes,
} from "react";
import { Link } from "react-router-dom";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  PropsWithChildren & {
    color?: "primary" | "danger" | "success" | "warning";
    variant?: "default" | "outline" | "text";
    href?: string;
    className?: string;
    iconLeft?: ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>;
    iconRight?: ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>;
  };

const Button: FC<ButtonProps> = ({
  color = "primary",
  variant = "default",
  type = "button",
  href,
  iconLeft,
  iconRight,
  children,
  className,
  ...props
}) => {
  const classes = classNames(
    "px-2.5 py-2 h-8 text-sm font-medium rounded-lg cursor-pointer transition-all duration-200 focus:outline-none flex items-center justify-center text-center",
    {
      "gap-2": !iconLeft && !iconRight,
      "gap-1.5": iconLeft || iconRight,
    },
    className,
    {
      // Primary default
      "bg-gopher-500 text-white hover:bg-gopher-600 focus:ring-1 focus:ring-gopher-200 dark:focus:ring-gopher-800 border border-gopher-500 hover:border-gopher-600":
        color === "primary" && variant === "default",
      // Danger default
      "bg-danger-500 text-white hover:bg-danger-600 focus:ring-1 focus:ring-danger-200 dark:focus:ring-danger-800 border border-danger-500 hover:border-danger-600":
        color === "danger" && variant === "default",
      // Success default
      "bg-success-500 text-white hover:bg-success-600 focus:ring-1 focus:ring-success-200 dark:focus:ring-success-800 border border-success-500 hover:border-success-600":
        color === "success" && variant === "default",
      // Warning default
      "bg-warning-500 text-white hover:bg-warning-600 focus:ring-1 focus:ring-warning-200 dark:focus:ring-warning-800 border border-warning-500 hover:border-warning-600":
        color === "warning" && variant === "default",
      // Primary outline
      "border border-gopher-500 text-gopher-600 dark:text-gopher-400 bg-transparent hover:bg-gopher-50 dark:hover:bg-gopher-900/20 focus:ring-1 focus:ring-gopher-200 dark:focus:ring-gopher-800":
        color === "primary" && variant === "outline",
      // Danger outline
      "border border-danger-500 text-danger-600 dark:text-danger-400 bg-transparent hover:bg-danger-50 dark:hover:bg-danger-900/20 focus:ring-1 focus:ring-danger-200 dark:focus:ring-danger-800":
        color === "danger" && variant === "outline",
      // Success outline
      "border border-success-500 text-success-600 dark:text-success-400 bg-transparent hover:bg-success-50 dark:hover:bg-success-900/20 focus:ring-1 focus:ring-success-200 dark:focus:ring-success-800":
        color === "success" && variant === "outline",
      // Warning outline
      "border border-warning-500 text-warning-600 dark:text-warning-400 bg-transparent hover:bg-warning-50 dark:hover:bg-warning-900/20 focus:ring-1 focus:ring-warning-200 dark:focus:ring-warning-800":
        color === "warning" && variant === "outline",
      // Primary text
      "text-gopher-600 dark:text-gopher-400 bg-transparent hover:bg-gopher-50 dark:hover:bg-gopher-900/20 focus:ring-1 focus:ring-gopher-200 dark:focus:ring-gopher-800 border border-transparent":
        color === "primary" && variant === "text",
      // Danger text
      "text-danger-600 dark:text-danger-400 bg-transparent hover:bg-danger-50 dark:hover:bg-danger-900/20 focus:ring-1 focus:ring-danger-200 dark:focus:ring-danger-800 border border-transparent":
        color === "danger" && variant === "text",
      // Success text
      "text-success-600 dark:text-success-400 bg-transparent hover:bg-success-50 dark:hover:bg-success-900/20 focus:ring-1 focus:ring-success-200 dark:focus:ring-success-800 border border-transparent":
        color === "success" && variant === "text",
      // Warning text
      "text-warning-600 dark:text-warning-400 bg-transparent hover:bg-warning-50 dark:hover:bg-warning-900/20 focus:ring-1 focus:ring-warning-200 dark:focus:ring-warning-800 border border-transparent":
        color === "warning" && variant === "text",
    }
  );

  const buttonContent = (
    <>
      {iconLeft &&
        createElement(iconLeft, {
          className: "flex-shrink-0 flex items-center -ml-1",
          size: 20,
        })}

      {children && (
        <span className="flex-grow min-w-0 truncate">{children}</span>
      )}

      {iconRight &&
        createElement(iconRight, {
          className: "flex-shrink-0 flex items-center -mr-1",
          size: 20,
        })}
    </>
  );

  return href ? (
    <Link to={href} className={classes}>
      {buttonContent}
    </Link>
  ) : (
    <button {...props} type={type} className={classes}>
      {buttonContent}
    </button>
  );
};

export default Button;
