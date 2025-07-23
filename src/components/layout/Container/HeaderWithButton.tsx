import { ParentComponent } from "solid-js";

const HeaderWithButton: ParentComponent = ({ children }) => {
  return (
    <hgroup class="flex justify-between items-center gap-4">{children}</hgroup>
  );
};

export default HeaderWithButton;
