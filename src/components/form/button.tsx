import { Icon, IconProps } from "@tabler/icons-react";
import classNames from "classnames";
import {
  ButtonHTMLAttributes,
  createElement,
  FC,
  ForwardRefExoticComponent,
  PropsWithChildren,
  RefAttributes,
  useEffect,
  useRef,
} from "react";
import { Link, useNavigate } from "react-router-dom";
import { keyAliases } from "./Shortcuts";
import ShortcutLabel from "./Shortcuts/ShortcutLabel";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  PropsWithChildren & {
    color?: "primary" | "danger" | "success" | "warning";
    variant?: "default" | "outline" | "text";
    href?: string;
    className?: string;
    iconLeft?: ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>;
    iconRight?: ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>;
    shortcutKey?: string;
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
  shortcutKey,
  ...props
}) => {
  const navigate = useNavigate();
  const buttonRef = useRef<HTMLButtonElement>(null);

  const classes = classNames(
    "px-2.5 py-2 h-8 text-sm rounded-lg transition-all duration-200 focus:outline-none flex items-center justify-center text-center",
    {
      "gap-2": !iconLeft && !iconRight,
      "gap-1.5": iconLeft || iconRight,
      "cursor-pointer": !props.disabled,
      "cursor-not-allowed opacity-50": props.disabled,
    },
    className,
    {
      // Primary default
      "bg-gopher-500 dark:bg-gopher-600 text-gopher-100 dark:text-gopher-300 border border-gopher-500 dark:border-gopher-600":
        color === "primary" && variant === "default",
      "hover:bg-gopher-600 focus:ring-1 focus:ring-gopher-200 dark:focus:ring-gopher-800 hover:border-gopher-600":
        color === "primary" && variant === "default" && !props.disabled,
      // Danger default
      "bg-danger-500 dark:bg-danger-600 text-danger-100 dark:text-danger-300 border border-danger-500 dark:border-danger-600":
        color === "danger" && variant === "default",
      "hover:bg-danger-600 focus:ring-1 focus:ring-danger-200 dark:focus:ring-danger-800 hover:border-danger-600":
        color === "danger" && variant === "default" && !props.disabled,
      // Success default
      "bg-success-500 dark:bg-success-600 text-success-100 dark:text-success-300 border border-success-500 dark:border-success-600":
        color === "success" && variant === "default",
      "hover:bg-success-600 focus:ring-1 focus:ring-success-200 dark:focus:ring-success-800 hover:border-success-600":
        color === "success" && variant === "default" && !props.disabled,
      // Warning default
      "bg-orange-500 dark:bg-orange-600 text-orange-100 dark:text-orange-300 border border-orange-500 dark:border-orange-600":
        color === "warning" && variant === "default",
      "hover:bg-orange-600 focus:ring-1 focus:ring-orange-200 dark:focus:ring-orange-800 hover:border-orange-600":
        color === "warning" && variant === "default" && !props.disabled,
      // Primary outline
      "border border-gopher-500 text-gopher-600 dark:text-gopher-400 bg-transparent":
        color === "primary" && variant === "outline",
      "hover:bg-gopher-50 dark:hover:bg-gopher-900/20 focus:ring-1 focus:ring-gopher-200 dark:focus:ring-gopher-800":
        color === "primary" && variant === "outline" && !props.disabled,
      // Danger outline
      "border border-danger-500 text-danger-600 dark:text-danger-400 bg-transparent":
        color === "danger" && variant === "outline",
      "hover:bg-danger-50 dark:hover:bg-danger-900/20 focus:ring-1 focus:ring-danger-200 dark:focus:ring-danger-800":
        color === "danger" && variant === "outline" && !props.disabled,
      // Success outline
      "border border-success-500 text-success-600 dark:text-success-400 bg-transparent":
        color === "success" && variant === "outline",
      "hover:bg-success-50 dark:hover:bg-success-900/20 focus:ring-1 focus:ring-success-200 dark:focus:ring-success-800":
        color === "success" && variant === "outline" && !props.disabled,
      // Warning outline
      "border border-orange-500 text-orange-600 dark:text-orange-400 bg-transparent":
        color === "warning" && variant === "outline",
      "hover:bg-orange-50 dark:hover:bg-orange-900/20 focus:ring-1 focus:ring-orange-200 dark:focus:ring-orange-800":
        color === "warning" && variant === "outline" && !props.disabled,
      // Primary text
      "text-gopher-600 dark:text-gopher-400 bg-transparent border border-transparent":
        color === "primary" && variant === "text",
      "hover:bg-gopher-100 dark:hover:bg-gopher-900/20 focus:ring-1 focus:ring-gopher-200 dark:focus:ring-gopher-800":
        color === "primary" && variant === "text" && !props.disabled,
      // Danger text
      "text-danger-600 dark:text-danger-400 bg-transparent border border-transparent":
        color === "danger" && variant === "text",
      "hover:bg-danger-50 dark:hover:bg-danger-900/20 focus:ring-1 focus:ring-danger-200 dark:focus:ring-danger-800":
        color === "danger" && variant === "text" && !props.disabled,
      // Success text
      "text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900 border border-transparent":
        color === "success" && variant === "text",
      "hover:bg-green-200 dark:hover:bg-green-800 focus:ring-1 focus:ring-green-200 dark:focus:ring-green-800":
        color === "success" && variant === "text" && !props.disabled,
      // Warning text
      "text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-900 border border-transparent":
        color === "warning" && variant === "text",
      "hover:bg-orange-200 dark:hover:bg-orange-800 focus:ring-1 focus:ring-orange-200 dark:focus:ring-orange-800":
        color === "warning" && variant === "text" && !props.disabled,
    }
  );

  useEffect(() => {
    if (!shortcutKey) return;

    const parts = shortcutKey.split("+").map((p) => p.toLowerCase());
    const key = parts.pop()!;
    const modifiers = new Set(parts);

    const handleKeyDown = (e: KeyboardEvent) => {
      let actualKey = e.key.toLowerCase();
      if (actualKey === "dead") {
        actualKey = e.code.replace("Key", "").toLowerCase();
      }

      const ctrlOrCmd = modifiers.has("ctrlorcmd")
        ? e.ctrlKey || e.metaKey
        : true;
      const altOrOption = modifiers.has("altoroption") ? e.altKey : true;

      if (
        actualKey === (keyAliases[key] ?? key) &&
        (modifiers.has("ctrl") ? e.ctrlKey : true) &&
        (modifiers.has("cmd") || modifiers.has("meta") ? e.metaKey : true) &&
        (modifiers.has("alt") || modifiers.has("option") ? e.altKey : true) &&
        (modifiers.has("shift") ? e.shiftKey : true) &&
        ctrlOrCmd &&
        altOrOption
      ) {
        e.preventDefault();
        if (href) {
          navigate(href);
        } else if (buttonRef.current) {
          buttonRef.current.click();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [shortcutKey, href, navigate]);

  const buttonContent = (
    <>
      {iconLeft &&
        createElement(iconLeft, {
          className: "flex-shrink-0 flex items-center",
          size: 20,
        })}

      {children && (
        <span className="flex-grow text-center justify-center truncate flex items-center">
          {children} {<ShortcutLabel shortcut={shortcutKey} />}
        </span>
      )}

      {iconRight &&
        createElement(iconRight, {
          className: "flex-shrink-0 flex items-center",
          size: 20,
        })}
    </>
  );

  return href ? (
    <Link to={href} className={classes}>
      {buttonContent}
    </Link>
  ) : (
    <button ref={buttonRef} {...props} type={type} className={classes}>
      {buttonContent}
    </button>
  );
};

export default Button;
