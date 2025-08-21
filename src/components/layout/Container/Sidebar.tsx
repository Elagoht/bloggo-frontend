import classNames from "classnames";
import React from "react";
import Container from ".";

interface SidebarProps {
  children: React.ReactNode;
  topMargin?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ children, topMargin }) => {
  return (
    <Container
      size="sm"
      className={classNames("flex flex-col gap-2 w-full lg:max-w-80", {
        "lg:mt-14": topMargin,
      })}
    >
      {children}
    </Container>
  );
};

export default Sidebar;
