import { ParentComponent } from "solid-js";

const FormCard: ParentComponent = ({ children }) => {
  return (
    <article class="bg-white dark:bg-smoke-950 rounded-2xl border border-smoke-200 dark:border-smoke-800 p-4">
      {children}
    </article>
  );
};

export default FormCard;
