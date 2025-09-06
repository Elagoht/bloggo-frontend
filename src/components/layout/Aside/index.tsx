import classNames from "classnames";
import { FC, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import PermissionGuard from "../../guards/PermissionGuard";
import { asideMenu } from "./aside";
import { useMobileStore } from "../../../stores/mobile";
import AsideMenuItem from "./AsideMenuItem";

const Aside: FC = () => {
  const location = useLocation();
  const { isMobileMenuOpen, closeMobileMenu } = useMobileStore();

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
          "flex flex-col w-64 p-4 bg-smoke-50/60 dark:bg-smoke-950/60 backdrop-blur h-[calc(100dvh-4rem)] overflow-auto border-r border-smoke-200/70 dark:border-smoke-800/70 transition-transform duration-300 ease-in-out",
          // Both mobile and desktop: fixed positioned
          "fixed top-16 left-0 z-40",
          // Mobile: sliding behavior
          isMobileMenuOpen
            ? "translate-x-0"
            : "-translate-x-full md:translate-x-0"
        )}
      >
        <nav className="flex flex-col gap-1">
          {asideMenu.map((item, index) => (
            <AsideMenuItem
              shortcutKey={`ctrlOrCmd+${index + 1}`}
              {...item}
              key={index}
            />
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Aside;
