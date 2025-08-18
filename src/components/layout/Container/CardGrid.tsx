import React from "react";

interface CardGridProps {
  children: React.ReactNode;
}

const CardGrid: React.FC<CardGridProps> = ({ children }) => {
  return <div className="grid grid-cols-cards gap-4">{children}</div>;
};

export default CardGrid;
