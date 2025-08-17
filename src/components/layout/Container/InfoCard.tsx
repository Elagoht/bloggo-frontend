import { ParentComponent } from "solid-js";

const InfoCard: ParentComponent = ({ children }) => {
  return (
    <aside class="bg-smoke-50 dark:bg-smoke-900 rounded-lg p-6">
      <section class="text-smoke-600 dark:text-smoke-400 text-sm leading-relaxed">
        {children}
      </section>
    </aside>
  );
};

export default InfoCard;
