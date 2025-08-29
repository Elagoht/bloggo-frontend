import classNames from "classnames";
import { FC, PropsWithChildren } from "react";

type ButtonGroupProps = PropsWithChildren & {
  // Layout configurations
  layout?: "flex-row" | "flex-col" | "grid-2x1" | "grid-1x2" | "grid-2x2";

  // Alignment options
  alignment?:
    | "start"
    | "center"
    | "end"
    | "stretch"
    | "between"
    | "around"
    | "evenly";

  // Spacing options
  gap?: "none" | "xs" | "sm" | "md" | "lg" | "xl";

  // Container styling
  className?: string;

  // Direction for flex layouts
  reverse?: boolean;

  // Wrap behavior
  wrap?: boolean;

  // Full width
  fullWidth?: boolean;
};

const ButtonGroup: FC<ButtonGroupProps> = ({
  children,
  layout = "flex-row",
  alignment = "start",
  gap = "sm",
  className,
  reverse = false,
  wrap = false,
  fullWidth = false,
}) => {
  // Simplified approach - just use children directly

  const containerClasses = classNames(
    // Base classes
    "inline-flex",

    // Layout classes
    {
      // Flex layouts
      "flex-row": layout === "flex-row" && !reverse,
      "flex-row-reverse": layout === "flex-row" && reverse,
      "flex-col": layout === "flex-col" && !reverse,
      "flex-col-reverse": layout === "flex-col" && reverse,

      // Grid layouts
      "grid grid-cols-2 grid-rows-1": layout === "grid-2x1",
      "grid grid-cols-1 grid-rows-2": layout === "grid-1x2",
      "grid grid-cols-2 grid-rows-2": layout === "grid-2x2",
    },

    // Alignment classes
    {
      // Flex row alignments
      "justify-start": alignment === "start" && layout === "flex-row",
      "justify-center": alignment === "center" && layout === "flex-row",
      "justify-end": alignment === "end" && layout === "flex-row",
      "justify-stretch": alignment === "stretch" && layout === "flex-row",
      "justify-between": alignment === "between" && layout === "flex-row",
      "justify-around": alignment === "around" && layout === "flex-row",
      "justify-evenly": alignment === "evenly" && layout === "flex-row",

      // Flex col alignments
      "items-start": alignment === "start" && layout === "flex-col",
      "items-center": alignment === "center" && layout === "flex-col",
      "items-end": alignment === "end" && layout === "flex-col",
      "items-stretch": alignment === "stretch" && layout === "flex-col",

      // Grid alignments
      "justify-items-start": alignment === "start" && layout.includes("grid"),
      "justify-items-center": alignment === "center" && layout.includes("grid"),
      "justify-items-end": alignment === "end" && layout.includes("grid"),
      "justify-items-stretch":
        alignment === "stretch" && layout.includes("grid"),
    },

    // Gap classes
    {
      "gap-0": gap === "none",
      "gap-1": gap === "xs",
      "gap-2": gap === "sm",
      "gap-4": gap === "md",
      "gap-6": gap === "lg",
      "gap-8": gap === "xl",
    },

    // Wrap behavior
    {
      "flex-wrap": wrap,
      "flex-nowrap": !wrap,
    },

    // Full width
    { "w-full": fullWidth },

    className
  );

  return <div className={containerClasses}>{children}</div>;
};

export default ButtonGroup;
