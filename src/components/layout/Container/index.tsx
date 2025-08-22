import classNames from "classnames";
import { FC, HTMLAttributes } from "react";

type ContainerProps = HTMLAttributes<HTMLInputElement> & {
  size?: "sm" | "md" | "lg" | "xl";
};

const Container: FC<ContainerProps> = ({ size = "lg", children, ...props }) => {
  return (
    <div
      {...props}
      className={classNames(
        "flex flex-col gap-2 w-full",
        {
          "max-w-screen-sm": size === "sm",
          "max-w-screen-md": size === "md",
          "max-w-screen-lg": size === "lg",
          "max-w-screen-xl": size === "xl",
        },
        props.className
      )}
    >
      {children}
    </div>
  );
};

export default Container;
