import React from "react";

interface InfoCardProps {
  children: React.ReactNode;
}

const InfoCard: React.FC<InfoCardProps> = ({ children }) => {
  return (
    <aside className="bg-smoke-50 dark:bg-smoke-900 rounded-lg p-6">
      <section className="text-smoke-600 dark:text-smoke-400 text-sm leading-relaxed">
        {children}
      </section>
    </aside>
  );
};

export default InfoCard;
