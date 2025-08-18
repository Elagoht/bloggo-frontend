import React from "react";

interface HeaderWithButtonProps {
  children: React.ReactNode;
}

const HeaderWithButton: React.FC<HeaderWithButtonProps> = ({ children }) => {
  return (
    <hgroup className="flex justify-between items-center gap-4">{children}</hgroup>
  );
};

export default HeaderWithButton;
