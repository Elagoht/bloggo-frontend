import { ParentComponent } from "solid-js";

const H2: ParentComponent = ({ children }) => {
  return <h2 class="text-xl font-bold">{children}</h2>;
};

export default H2;
