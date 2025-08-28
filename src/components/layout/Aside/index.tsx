import classNames from "classnames";
import { FC, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import PermissionGuard from "../../Guards/PermissionGuard";
import { asideMenu } from "./aside";
import { useMobileStore } from "../../../stores/mobile";

const Aside: FC = () => {
  const location = useLocation();
  const { isMobileMenuOpen, closeMobileMenu } = useMobileStore();

  const isActive = (href: string) =>
    href === "/"
      ? location.pathname === href
      : location.pathname.startsWith(href);

  // Close mobile menu when clicking outside on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMobileMenuOpen) {
        closeMobileMenu();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobileMenuOpen, closeMobileMenu]);

  const handleLinkClick = () => {
    if (window.innerWidth < 768) {
      closeMobileMenu();
    }
  };

  return (
    <>
      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 top-16 bg-black/50 z-30 md:hidden"
          onClick={closeMobileMenu}
        />
      )}

      <aside
        className={classNames(
          "flex flex-col w-64 p-4 bg-smoke-50/70 dark:bg-smoke-950/70 backdrop-blur-sm h-[calc(100dvh-4rem)] overflow-auto border-r border-smoke-200/70 dark:border-smoke-800/70 transition-transform duration-300 ease-in-out",
          // Both mobile and desktop: fixed positioned
          "fixed top-16 left-0 z-40",
          // Mobile: sliding behavior
          isMobileMenuOpen
            ? "translate-x-0"
            : "-translate-x-full md:translate-x-0"
        )}
      >
        <nav className="flex flex-col gap-1">
          {asideMenu.map((item, index) => {
            const MenuItem = (
              <Link
                key={index}
                to={item.href}
                onClick={handleLinkClick}
                className={classNames(
                  "flex items-center whitespace-nowrap gap-3 rounded-lg py-2 px-3 transition-all duration-200 group font-medium",
                  {
                    "bg-gradient-to-r from-gopher-100 to-gopher-200 dark:from-gopher-800/50 dark:to-gopher-900/30 text-gopher-800 dark:text-gopher-200 shadow-sm border border-gopher-200/50 dark:border-gopher-700/50":
                      isActive(item.href),
                    "text-smoke-700 dark:text-smoke-300 hover:bg-smoke-100/80 dark:hover:bg-smoke-900/50 hover:text-smoke-900 dark:hover:text-smoke-100 hover:shadow-sm hover:border-smoke-200/50 dark:hover:border-smoke-700/50 border border-transparent":
                      !isActive(item.href),
                  }
                )}
              >
                <span
                  className={classNames(
                    "p-1 rounded-lg transition-colors duration-200",
                    {
                      "bg-gopher-200 dark:bg-gopher-700": isActive(item.href),
                      "bg-smoke-200 dark:bg-smoke-800 group-hover:bg-gopher-100 dark:group-hover:bg-gopher-800":
                        !isActive(item.href),
                    }
                  )}
                >
                  <item.icon
                    size={16}
                    strokeWidth={2}
                    className={classNames("transition-colors duration-200", {
                      "text-gopher-700 dark:text-gopher-300": isActive(
                        item.href
                      ),
                      "text-smoke-600 dark:text-smoke-400 group-hover:text-gopher-600 dark:group-hover:text-gopher-400":
                        !isActive(item.href),
                    })}
                  />
                </span>

                <span className="text-sm">{item.name}</span>
              </Link>
            );

            if (item.perm) {
              return (
                <PermissionGuard key={index} permission={item.perm}>
                  {MenuItem}
                </PermissionGuard>
              );
            }

            return MenuItem;
          })}
        </nav>
      </aside>
    </>
  );
};

export default Aside;
