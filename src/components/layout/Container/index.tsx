import classNames from "classnames";
import { ParentComponent } from "solid-js";

type ContainerProps = {
  size?: "sm" | "md" | "lg" | "xl";
};

const Container: ParentComponent<ContainerProps> = ({
  size = "lg",
  children,
}) => {
  return (
    <div
      class={classNames("flex flex-col gap-2 mx-auto w-full", {
        "max-w-screen-sm": size == "sm",
        "max-w-screen-md": size == "md",
        "max-w-screen-lg": size == "lg",
        "max-w-screen-xl": size == "xl",
      })}
    >
      {children}
    </div>
  );
};

export default Container;
