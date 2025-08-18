import React from "react";
import classNames from "classnames";

interface ContainerProps {
  size?: "sm" | "md" | "lg" | "xl";
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({
  size = "lg",
  children,
}) => {
  return (
    <div
      className={classNames("flex flex-col gap-2 w-full", {
        "max-w-screen-sm": size === "sm",
        "max-w-screen-md": size === "md",
        "max-w-screen-lg": size === "lg",
        "max-w-screen-xl": size === "xl",
      })}
    >
      {children}
    </div>
  );
};

export default Container;
