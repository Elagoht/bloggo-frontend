import { FC, PropsWithChildren } from "react";

const InfoCard: FC<PropsWithChildren> = ({ children }) => {
  return (
    <aside className="bg-smoke-50 dark:bg-smoke-950 border border-smoke-100 dark:border-smoke-900 rounded-lg p-6">
      <section className="text-smoke-600 dark:text-smoke-400 text-sm leading-relaxed">
        {children}
      </section>
    </aside>
  );
};

export default InfoCard;
