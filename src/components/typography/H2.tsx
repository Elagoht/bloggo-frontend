import { FC, PropsWithChildren } from "react";

const H2: FC<PropsWithChildren> = ({ children }) => {
  return <h2 className="text-xl font-bold">{children}</h2>;
};

export default H2;
