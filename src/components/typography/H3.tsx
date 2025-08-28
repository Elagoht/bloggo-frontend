import { FC, PropsWithChildren } from "react";

const H3: FC<PropsWithChildren> = ({ children }) => {
  return (
    <h3 className="text-lg font-bold text-smoke-700 dark:text-smoke-300">
      {children}
    </h3>
  );
};

export default H3;
