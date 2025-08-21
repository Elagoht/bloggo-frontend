import { FC, ReactNode } from "react";

interface H3Props {
  children: ReactNode;
}

const H3: FC<H3Props> = ({ children }) => {
  return (
    <h3 className="text-lg font-bold text-smoke-700 dark:text-smoke-300">
      {children}
    </h3>
  );
};

export default H3;
