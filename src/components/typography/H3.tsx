import { ParentComponent } from "solid-js";

const H3: ParentComponent = ({ children }) => {
  return (
    <h3 class="text-lg font-bold text-smoke-700 dark:text-smoke-300">
      {children}
    </h3>
  );
};

export default H3;
