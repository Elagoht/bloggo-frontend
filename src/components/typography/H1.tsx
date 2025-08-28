import { FC, PropsWithChildren } from "react";

const H1: FC<PropsWithChildren> = ({ children }) => {
  return <h1 className="text-2xl font-bold">{children}</h1>;
};

export default H1;
