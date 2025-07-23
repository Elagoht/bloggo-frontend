import { ParentComponent } from "solid-js";

const CardGrid: ParentComponent = ({ children }) => {
  return <div class="grid grid-cols-cards gap-4 mt-2">{children}</div>;
};

export default CardGrid;
