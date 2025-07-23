import { ParentComponent } from "solid-js";

const H3: ParentComponent = ({ children }) => {
  return <h3 class="text-lg font-bold">{children}</h3>;
};

export default H3;
