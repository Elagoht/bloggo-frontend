import classNames from "classnames";
import React from "react";

interface SidebarProps {
  children: React.ReactNode;
  topMargin?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ children, topMargin }) => {
  return (
    <div
      className={classNames("flex flex-col gap-2 w-full md:max-w-80", {
        "mt-14": topMargin,
      })}
    >
      {children}
    </div>
  );
};

export default Sidebar;
