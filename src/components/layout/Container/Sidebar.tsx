import React from "react";

interface SidebarProps {
  children: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  return <div className="flex flex-col gap-2 w-full md:max-w-80">{children}</div>;
};

export default Sidebar;
