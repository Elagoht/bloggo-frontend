import React from "react";

interface H3Props {
  children: React.ReactNode;
}

const H3: React.FC<H3Props> = ({ children }) => {
  return (
    <h3 className="text-lg font-bold text-smoke-700 dark:text-smoke-300">
      {children}
    </h3>
  );
};

export default H3;
