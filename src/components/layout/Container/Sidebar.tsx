import { ParentComponent } from "solid-js";

const Sidebar: ParentComponent = ({ children }) => {
  return <div class="flex flex-col gap-2 w-full md:max-w-80">{children}</div>;
};

export default Sidebar;
