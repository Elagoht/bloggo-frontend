import { ParentComponent } from "solid-js";

const H1: ParentComponent = ({ children }) => {
  return <h1 class="text-2xl font-bold">{children}</h1>;
};

export default H1;
