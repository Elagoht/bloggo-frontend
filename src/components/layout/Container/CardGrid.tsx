import { FC, PropsWithChildren } from "react";

const CardGrid: FC<PropsWithChildren> = ({ children }) => {
  return <div className="grid grid-cols-cards gap-4">{children}</div>;
};

export default CardGrid;
