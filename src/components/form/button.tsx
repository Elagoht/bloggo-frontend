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
  onClick,
  ...props
}) => {
  const navigate = useNavigate();
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!shortcutKey) return;

    const parseShortcut = (shortcut: string) => {
      const normalized = shortcut.toLowerCase().trim();

      // sadece "+" verilmişse
      if (normalized === "+") {
        return { key: "+", modifiers: new Set<string>() };
      }

      const parts = normalized.split("+");
      const key = parts.pop() || "";

      // alias: "plus" => "+"
      const finalKey = key === "plus" ? "+" : key;

      return { key: finalKey, modifiers: new Set(parts) };
    };

    const { key, modifiers } = parseShortcut(shortcutKey);

    const handleKeyDown = (e: KeyboardEvent) => {
      const ctrlOrCmd = modifiers.has("ctrlorcmd")
        ? e.ctrlKey || e.metaKey
        : true;

      if (
        e.key.toLowerCase() === key &&
        (modifiers.has("ctrl") ? e.ctrlKey : true) &&
        (modifiers.has("alt") ? e.altKey : true) &&
        (modifiers.has("shift") ? e.shiftKey : true) &&
        (modifiers.has("meta") ? e.metaKey : true) &&
        ctrlOrCmd
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

  const classes = classNames(
    "px-2.5 py-2 h-8 text-sm rounded-lg cursor-pointer transition-all duration-200 focus:outline-none flex items-center justify-center text-center",
    {
      "gap-2": !iconLeft && !iconRight,
      "gap-1.5": iconLeft || iconRight,
    },
    className,
    {
      // Primary default
      "bg-gopher-500 dark:bg-gopher-600 text-gopher-100 dark:text-gopher-300 hover:bg-gopher-600 focus:ring-1 focus:ring-gopher-200 dark:focus:ring-gopher-800 border border-gopher-500 dark:border-gopher-600 hover:border-gopher-600":
        color === "primary" && variant === "default",
      // Danger default
      "bg-danger-500 dark:bg-danger-600 text-danger-100 dark:text-danger-300 hover:bg-danger-600 focus:ring-1 focus:ring-danger-200 dark:focus:ring-danger-800 border border-danger-500 dark:border-danger-600 hover:border-danger-600":
        color === "danger" && variant === "default",
      // Success default
      "bg-success-500 dark:bg-success-600 text-success-100 dark:text-success-300 hover:bg-success-600 focus:ring-1 focus:ring-success-200 dark:focus:ring-success-800 border border-success-500 dark:border-success-600 hover:border-success-600":
        color === "success" && variant === "default",
      // Warning default
      "bg-orange-500 dark:bg-orange-600 text-orange-100 dark:text-orange-300 hover:bg-orange-600 focus:ring-1 focus:ring-orange-200 dark:focus:ring-orange-800 border border-orange-500 dark:border-orange-600 hover:border-orange-600":
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
      "border border-orange-500 text-orange-600 dark:text-orange-400 bg-transparent hover:bg-orange-50 dark:hover:bg-orange-900/20 focus:ring-1 focus:ring-orange-200 dark:focus:ring-orange-800":
        color === "warning" && variant === "outline",
      // Primary text
      "text-gopher-600 dark:text-gopher-400 bg-gopher-100 dark:bg-gopher-900 hover:bg-gopher-200 dark:hover:bg-gopher-800 focus:ring-1 focus:ring-gopher-200 dark:focus:ring-gopher-800 border border-transparent":
        color === "primary" && variant === "text",
      // Danger text
      "text-danger-600 dark:text-danger-400 bg-transparent hover:bg-danger-50 dark:hover:bg-danger-900/20 focus:ring-1 focus:ring-danger-200 dark:focus:ring-danger-800 border border-transparent":
        color === "danger" && variant === "text",
      // Success text
      "text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900 hover:bg-green-200 dark:hover:bg-green-800 focus:ring-1 focus:ring-green-200 dark:focus:ring-green-800 border border-transparent":
        color === "success" && variant === "text",
      // Warning text
      "text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-900 hover:bg-orange-200 dark:hover:bg-orange-800 focus:ring-1 focus:ring-orange-200 dark:focus:ring-orange-800 border border-transparent":
        color === "warning" && variant === "text",
    }
  );

  const isMac =
    typeof navigator !== "undefined" && /Mac/i.test(navigator.platform);

  const renderShortcutLabel = (shortcut?: string) => {
    if (!shortcut) return null;

    const parts = shortcut.split("+").map((p) => p.toLowerCase());

    return (
      <span className="ml-2 text-xs text-gray-500 flex gap-1">
        {parts.map((part, i) => {
          let label = part;

          switch (part) {
            case "ctrlorcmd":
              label = isMac ? "⌘" : "Ctrl";
              break;
            case "ctrl":
              label = "Ctrl";
              break;
            case "cmd":
            case "meta":
              label = "⌘";
              break;
            case "alt":
              label = "Alt";
              break;
            case "shift":
              label = "Shift";
              break;
            case "plus":
              label = "+";
              break;
            case " ":
            case "space":
              label = "Space";
              break;
            default:
              label = part.toUpperCase();
          }

          return (
            <kbd
              key={i}
              className="px-1.5 py-0.5 rounded text-black dark:text-white bg-white dark:bg-black bg-opacity-30 dark:bg-opacity-30"
            >
              {label}
            </kbd>
          );
        })}
      </span>
    );
  };

  const buttonContent = (
    <>
      {iconLeft &&
        createElement(iconLeft, {
          className: "flex-shrink-0 flex items-center -ml-1",
          size: 20,
        })}

      {children && (
        <span className="flex-grow text-center justify-center truncate flex items-center">
          {children}
          {renderShortcutLabel(shortcutKey)}
        </span>
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
    <button
      {...props}
      type={type}
      className={classes}
      ref={buttonRef}
      onClick={onClick}
    >
      {buttonContent}
    </button>
  );
};

export default Button;
