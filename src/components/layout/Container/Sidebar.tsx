import classNames from "classnames";
import { FC, PropsWithChildren } from "react";
import Container from ".";

type SidebarProps = PropsWithChildren & {
  topMargin?: boolean;
};

const Sidebar: FC<SidebarProps> = ({ children, topMargin }) => {
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
