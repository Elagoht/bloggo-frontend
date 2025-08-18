import React from "react";

interface ContentWithSidebarProps {
  children: React.ReactNode;
}

const ContentWithSidebar: React.FC<ContentWithSidebarProps> = ({ children }) => {
  return (
    <div className="flex max-md:flex-col-reverse justify-center w-full mx-auto gap-4">
      {children}
    </div>
  );
};

export default ContentWithSidebar;
