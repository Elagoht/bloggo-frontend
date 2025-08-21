import classNames from "classnames";
import React, { PropsWithChildren } from "react";

type ContentWithSidebarProps = PropsWithChildren & {
  reverse?: boolean;
};

const ContentWithSidebar: React.FC<ContentWithSidebarProps> = ({
  children,
  reverse,
}) => {
  return (
    <div
      className={classNames("flex justify-center w-full mx-auto gap-4", {
        "max-lg:flex-wrap-reverse": reverse,
        "max-lg:flex-wrap": !reverse,
      })}
    >
      {children}
    </div>
  );
};

export default ContentWithSidebar;
