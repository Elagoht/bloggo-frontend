import classNames from "classnames";
import { FC, ReactNode, useState } from "react";

type TabItem = {
  value: string;
  label: ReactNode;
  content: ReactNode;
  disabled?: boolean;
};

type TabsProps = {
  defaultTab: string;
  tabs: TabItem[];
  className?: string;
  tabListClassName?: string;
  tabClassName?: string;
  tabPanelClassName?: string;
};

const Tabs: FC<TabsProps> = ({
  defaultTab,
  tabs,
  className = "",
  tabListClassName = "",
  tabClassName = "",
  tabPanelClassName = "",
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  const activeTabContent = tabs.find((tab) => tab.value === activeTab)?.content;

  return (
    <div className={className}>
      <div
        className={classNames(
          "flex border-b border-smoke-200 dark:border-smoke-700 mb-6",
          tabListClassName
        )}
      >
        {tabs.map(({ value, label, disabled = false }) => {
          const isActive = activeTab === value;
          return (
            <button
              key={value}
              onClick={() => !disabled && setActiveTab(value)}
              className={classNames(
                "px-4 py-2 font-medium text-sm transition-colors relative",
                tabClassName,
                {
                  "text-gopher-500 dark:text-gopher-400 border-b-2 border-gopher-500 dark:border-gopher-400":
                    isActive,
                  "text-smoke-600 dark:text-smoke-300 hover:text-gopher-500 dark:hover:text-gopher-400":
                    !isActive,
                  "opacity-50 cursor-not-allowed": disabled,
                  "cursor-pointer": !disabled,
                }
              )}
              disabled={disabled}
            >
              {label}
            </button>
          );
        })}
      </div>
      <div className={tabPanelClassName}>{activeTabContent}</div>
    </div>
  );
};

export default Tabs;
