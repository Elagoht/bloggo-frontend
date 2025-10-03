import { Icon, IconProps } from "@tabler/icons-react";
import classNames from "classnames";
import {
  createElement,
  FC,
  ForwardRefExoticComponent,
  RefAttributes,
} from "react";
import { Link, useLocation } from "react-router-dom";
import { useMobileStore } from "../../../stores/mobile";
import PermissionGuard from "../../Guards/PermissionGuard";

type AsideMenuItemProps = {
  name: string;
  href: string;
  icon: ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>;
  perm?: Permission | Permission[];
};

const AsideMenuItem: FC<AsideMenuItemProps> = ({ href, name, perm, icon }) => {
  const { closeMobileMenu } = useMobileStore();
  const location = useLocation();

  const handleLinkClick = () => {
    if (window.innerWidth < 768) {
      closeMobileMenu();
    }
  };

  const isActive = (href: string) =>
    href === "/"
      ? location.pathname === href.split("?")[0]
      : location.pathname.startsWith(href.split("?")[0]);

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
    </Link>
  );

  if (perm) {
    return <PermissionGuard permission={perm}>{MenuItem}</PermissionGuard>;
  }

  return MenuItem;
};

export default AsideMenuItem;
