import React from "react";

interface H1Props {
  children: React.ReactNode;
}

const H1: React.FC<H1Props> = ({ children }) => {
  return <h1 className="text-2xl font-bold">{children}</h1>;
};

export default H1;
