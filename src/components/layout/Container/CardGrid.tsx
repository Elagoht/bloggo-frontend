import { ParentComponent } from "solid-js";

const CardGrid: ParentComponent = ({ children }) => {
  return <div class="grid grid-cols-cards gap-4">{children}</div>;
};

export default CardGrid;
