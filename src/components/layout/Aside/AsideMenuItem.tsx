import { Icon, IconProps } from "@tabler/icons-react";
import classNames from "classnames";
import {
  createElement,
  FC,
  ForwardRefExoticComponent,
  RefAttributes,
  useEffect,
} from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMobileStore } from "../../../stores/mobile";
import PermissionGuard from "../../guards/PermissionGuard";
import { isMac, keyAliases, keyLabels } from "../../form/Shortcuts";
import ShortcutLabel from "../../form/Shortcuts/ShortcutLabel";

type AsideMenuItemProps = {
  name: string;
  href: string;
  icon: ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>;
  shortcutKey: string;
  perm?: Permission | Permission[];
};

const AsideMenuItem: FC<AsideMenuItemProps> = ({
  href,
  name,
  perm,
  icon,
  shortcutKey,
}) => {
  const { closeMobileMenu } = useMobileStore();

  const navigate = useNavigate();

  const handleLinkClick = () => {
    if (window.innerWidth < 768) {
      closeMobileMenu();
    }
  };

  const isActive = (href: string) =>
    href === "/"
      ? location.pathname === href
      : location.pathname.startsWith(href);

  useEffect(() => {
    if (!shortcutKey) return;

    const parts = shortcutKey.split("+").map((p) => p.toLowerCase());
    const key = parts.pop()!;
    const modifiers = new Set(parts);

    const handleKeyDown = (event: KeyboardEvent) => {
      let actualKey = event.key.toLowerCase();
      if (actualKey === "dead") {
        actualKey = event.code.replace("Key", "").toLowerCase();
      }

      const ctrlOrCmd = modifiers.has("ctrlorcmd")
        ? event.ctrlKey || event.metaKey
        : true;
      const altOrOption = modifiers.has("altoroption") ? event.altKey : true;

      if (
        actualKey === (keyAliases[key] ?? key) &&
        (modifiers.has("ctrl") ? event.ctrlKey : true) &&
        (modifiers.has("cmd") || modifiers.has("meta")
          ? event.metaKey
          : true) &&
        (modifiers.has("alt") || modifiers.has("option")
          ? event.altKey
          : true) &&
        (modifiers.has("shift") ? event.shiftKey : true) &&
        ctrlOrCmd &&
        altOrOption
      ) {
        navigate(href);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [shortcutKey, href, navigate]);

  const renderShortcutLabel = (shortcut?: string) => {
    if (!shortcut) return null;
    const parts = shortcut.split("+").map((p) => p.toLowerCase());

    return (
      <span className="ml-2 text-xs flex gap-1">
        {parts.map((part, i) => {
          const labelDef = keyLabels[part];
          const label =
            typeof labelDef === "function"
              ? labelDef(isMac)
              : labelDef ?? part.toUpperCase();
          return (
            <kbd
              key={i}
              className="max-md:hidden px-1.5 py-0.5 rounded text-black dark:text-white bg-white dark:bg-black bg-opacity-30 dark:bg-opacity-30"
            >
              {label}
            </kbd>
          );
        })}
      </span>
    );
  };

  const MenuItem = (
    <Link
      to={href}
      onClick={handleLinkClick}
      className={classNames(
        "flex items-center whitespace-nowrap gap-3 rounded-lg py-2 px-3 transition-all duration-200 group font-medium",
        {
          "bg-gradient-to-r from-gopher-200/50 to-gopher-100/30 dark:from-gopher-800/50 dark:to-gopher-900/30 text-gopher-800 dark:text-gopher-200 shadow-sm border border-gopher-500/50 dark:border-gopher-700/50":
            isActive(href),
          "text-smoke-700 dark:text-smoke-300 hover:bg-smoke-100/80 dark:hover:bg-smoke-900/50 hover:text-smoke-900 dark:hover:text-smoke-100 hover:shadow-sm hover:border-smoke-200/50 dark:hover:border-smoke-700/50 border border-transparent":
            !isActive(href),
        }
      )}
    >
      <span
        className={classNames("p-1 rounded-lg transition-colors duration-200", {
          "bg-gopher-200 dark:bg-gopher-700": isActive(href),
          "bg-smoke-200 dark:bg-smoke-800 group-hover:bg-gopher-100 dark:group-hover:bg-gopher-800":
            !isActive(href),
        })}
      >
        {createElement(icon, {
          size: 16,
          strokeWidth: 2,
          className: classNames("transition-colors duration-200", {
            "text-gopher-700 dark:text-gopher-300": isActive(href),
            "text-smoke-600 dark:text-smoke-400 group-hover:text-gopher-600 dark:group-hover:text-gopher-400":
              !isActive(href),
          }),
        })}
      </span>

      <span className="text-sm grow">{name}</span>

      <ShortcutLabel shortcut={shortcutKey} />
    </Link>
  );

  if (perm) {
    return <PermissionGuard permission={perm}>{MenuItem}</PermissionGuard>;
  }

  return MenuItem;
};

export default AsideMenuItem;
