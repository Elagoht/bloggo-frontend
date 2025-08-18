import React from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { Icon, IconProps } from "@tabler/icons-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: "primary" | "danger" | "success";
  variant?: "default" | "outline" | "text";
  href?: string;
  className?: string;
  iconLeft?: React.ForwardRefExoticComponent<
    IconProps & React.RefAttributes<Icon>
  >;
  iconRight?: React.ForwardRefExoticComponent<
    IconProps & React.RefAttributes<Icon>
  >;
  children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  color = "primary",
  variant = "default",
  href,
  iconLeft: IconLeft,
  iconRight: IconRight,
  children,
  className,
  ...props
}) => {
  const classes = classNames(
    "p-2 text-xs rounded-lg cursor-pointer transition-all ease-in-out focus:outline-none hover:outline-none flex items-center justify-center text-center",
    {
      "gap-2": !IconLeft && !IconRight, // Default gap when no icons
      "gap-1": IconLeft || IconRight, // Smaller gap when icons are present
    },
    className,
    {
      "bg-gopher-500 text-gopher-50 hover:bg-gopher-600 hover:outline-gopher-300 hover:outline-offset-2 hover:outline-2 hover:outline-gopher-600 focus:outline-2 focus:outline-offset-2 focus:outline-gopher-400":
        color === "primary" && variant === "default",
      "bg-danger-500 text-danger-50 hover:bg-danger-600 hover:outline-danger-300 hover:outline-offset-2 hover:outline-2  hover:outline-danger-600 focus:outline-2 focus:outline-offset-2 focus:outline-danger-400":
        color === "danger" && variant === "default",
      "bg-success-500 text-success-50 hover:bg-success-600 hover:outline-success-300 hover:outline-offset-2 hover:outline-2 hover:outline-success-600 focus:outline-2 focus:outline-offset-2 focus:outline-success-400":
        color === "success" && variant === "default",
      "border-2 border-gopher-500 text-gopher-500 focus:outline-gopher-500 hover:outline-gopher-300 hover:outline-offset-2 hover:outline-2 hover:outline-gopher-600":
        color === "primary" && variant === "outline",
      "border-2 border-danger-500 text-danger-500 focus:outline-danger-500 hover:outline-danger-300 hover:outline-offset-2 hover:outline-2  hover:outline-danger-600":
        color === "danger" && variant === "outline",
      "border-2 border-success-500 text-success-500 focus:outline-success-500 hover:outline-success-300 hover:outline-offset-2 hover:outline-2 hover:outline-success-600":
        color === "success" && variant === "outline",
      "text-gopher-500 hover:bg-gopher-50 dark:hover:bg-gopher-950 focus:outline-gopher-500":
        color === "primary" && variant === "text",
      "text-danger-500 hover:bg-danger-50 dark:hover:bg-danger-950 focus:outline-danger-500":
        color === "danger" && variant === "text",
      "text-success-500 hover:bg-success-50 dark:hover:bg-success-950 focus:outline-success-500":
        color === "success" && variant === "text",
    }
  );

  const buttonContent = (
    <>
      {IconLeft && (
        <span className="flex-shrink-0 flex items-center">
          <IconLeft size={18} />
        </span>
      )}

      {children && (
        <span className="flex-grow min-w-0 truncate">{children}</span>
      )}

      {IconRight && (
        <span className="flex-shrink-0 flex items-center">
          <IconRight size={18} />
        </span>
      )}
    </>
  );

  return href ? (
    <Link to={href} className={classes}>
      {buttonContent}
    </Link>
  ) : (
    <button {...props} className={classes}>
      {buttonContent}
    </button>
  );
};

export default Button;
