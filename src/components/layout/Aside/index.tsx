import React from "react";
import { asideMenu } from "./aside";
import { Link, useLocation } from "react-router-dom";
import classNames from "classnames";

const Aside: React.FC = () => {
  const location = useLocation();

  const isActive = (href: string) =>
    href === "/"
      ? location.pathname === href
      : location.pathname.startsWith(href);

  return (
    <aside className="flex flex-col w-64 p-4 bg-smoke-50 dark:bg-smoke-950 h-[calc(100dvh-4rem)] overflow-auto sticky top-16">
      <nav className="flex flex-col gap-2">
        {asideMenu.map((item, index) => (
          <Link
            key={index}
            to={item.href}
            className={classNames(
              "flex items-center whitespace-nowrap gap-3.5 rounded-lg py-1 px-4",
              {
                "bg-gopher-200 text-gopher-800": isActive(item.href),
                "text-gopher-900 dark:text-gopher-100 hover:bg-smoke-100 dark:hover:bg-smoke-900":
                  !isActive(item.href),
              }
            )}
          >
            <item.icon size={20} strokeWidth={2} /> {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Aside;
