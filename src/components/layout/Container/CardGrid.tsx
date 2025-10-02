import classNames from "classnames";
import { FC, PropsWithChildren } from "react";

type CardGridProps = PropsWithChildren & {
  compact?: boolean;
};

const CardGrid: FC<CardGridProps> = ({ children, compact }) => {
  return (
    <div
      className={classNames("grid grid-cols-1 gap-4", {
        "xl:grid-cols-2 2xl:grid-cols-3": !compact,
        "lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4": compact,
      })}
    >
      {children}
    </div>
  );
};

export default CardGrid;
