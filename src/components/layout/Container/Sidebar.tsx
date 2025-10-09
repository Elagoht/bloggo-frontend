import classNames from "classnames";
import { FC, PropsWithChildren } from "react";
import Container from ".";

type SidebarProps = PropsWithChildren & {
  topMargin?: boolean;
};

const Sidebar: FC<SidebarProps> = ({ children, topMargin }) => {
  return (
    <Container
      className={classNames(
        "flex flex-col gap-2 w-full lg:max-w-80 lg:sticky lg:self-start",
        {
          "lg:top-[8.5rem]": topMargin,
          "lg:top-4": !topMargin,
        }
      )}
    >
      {children}
    </Container>
  );
};

export default Sidebar;
