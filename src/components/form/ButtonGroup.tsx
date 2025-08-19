import React from "react";
import classNames from "classnames";

interface ButtonGroupProps {
  children: React.ReactNode;

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

  // Sizing configurations
  sizing?:
    | "equal"
    | "first-grow"
    | "last-grow"
    | "middle-grow"
    | "auto"
    | "custom";

  // Button sizing within group
  buttonSizes?: Array<
    | "smallest"
    | "small"
    | "medium"
    | "large"
    | "flex-1"
    | "flex-2"
    | "flex-3"
    | "auto"
  >;

  // Spacing options
  gap?: "none" | "xs" | "sm" | "md" | "lg" | "xl";

  // Visual grouping
  grouped?: boolean;
  rounded?: "none" | "sm" | "md" | "lg" | "full";

  // Responsive behavior
  responsive?: {
    sm?: Partial<Pick<ButtonGroupProps, "layout" | "alignment" | "sizing">>;
    md?: Partial<Pick<ButtonGroupProps, "layout" | "alignment" | "sizing">>;
    lg?: Partial<Pick<ButtonGroupProps, "layout" | "alignment" | "sizing">>;
  };

  // Container styling
  className?: string;

  // Direction for flex layouts
  reverse?: boolean;

  // Wrap behavior
  wrap?: boolean;

  // Full width
  fullWidth?: boolean;
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({
  children,
  layout = "flex-row",
  alignment = "start",
  sizing = "auto",
  buttonSizes = [],
  gap = "sm",
  grouped = false,
  rounded = "md",
  responsive,
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

    // Responsive classes
    responsive?.sm && {
      "sm:flex-row": responsive.sm.layout === "flex-row",
      "sm:flex-col": responsive.sm.layout === "flex-col",
      "sm:grid sm:grid-cols-2 sm:grid-rows-1":
        responsive.sm.layout === "grid-2x1",
      "sm:justify-start": responsive.sm.alignment === "start",
      "sm:justify-center": responsive.sm.alignment === "center",
      "sm:justify-end": responsive.sm.alignment === "end",
    },

    responsive?.md && {
      "md:flex-row": responsive.md.layout === "flex-row",
      "md:flex-col": responsive.md.layout === "flex-col",
      "md:grid md:grid-cols-2 md:grid-rows-1":
        responsive.md.layout === "grid-2x1",
      "md:justify-start": responsive.md.alignment === "start",
      "md:justify-center": responsive.md.alignment === "center",
      "md:justify-end": responsive.md.alignment === "end",
    },

    responsive?.lg && {
      "lg:flex-row": responsive.lg.layout === "flex-row",
      "lg:flex-col": responsive.lg.layout === "flex-col",
      "lg:grid lg:grid-cols-2 lg:grid-rows-1":
        responsive.lg.layout === "grid-2x1",
      "lg:justify-start": responsive.lg.alignment === "start",
      "lg:justify-center": responsive.lg.alignment === "center",
      "lg:justify-end": responsive.lg.alignment === "end",
    },

    className
  );

  return <div className={containerClasses}>{children}</div>;
};

export default ButtonGroup;
