import { FC, PropsWithChildren } from "react";

const HeaderWithButton: FC<PropsWithChildren> = ({ children }) => {
  return (
    <hgroup className="flex justify-between items-center gap-4">
      {children}
    </hgroup>
  );
};

export default HeaderWithButton;
