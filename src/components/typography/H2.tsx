import { FC, ReactNode } from "react";

interface H2Props {
  children: ReactNode;
}

const H2: FC<H2Props> = ({ children }) => {
  return <h2 className="text-xl font-bold">{children}</h2>;
};

export default H2;
