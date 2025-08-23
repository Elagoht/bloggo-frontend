import { FC, PropsWithChildren } from "react";

const CardGrid: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
      {children}
    </div>
  );
};

export default CardGrid;
