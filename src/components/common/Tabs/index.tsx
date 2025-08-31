import { FC, ReactNode, useState, createContext, useContext } from "react";

interface TabsContextType {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TabsContext = createContext<TabsContextType | null>(null);

interface TabsProps {
  defaultTab: string;
  children: ReactNode;
  className?: string;
}

export const Tabs: FC<TabsProps> = ({ defaultTab, children, className = "" }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
};

interface TabListProps {
  children: ReactNode;
  className?: string;
}

export const TabList: FC<TabListProps> = ({ children, className = "" }) => {
  return (
    <div className={`flex border-b border-smoke-200 dark:border-smoke-700 mb-6 ${className}`}>
      {children}
    </div>
  );
};

interface TabProps {
  value: string;
  children: ReactNode;
  className?: string;
  disabled?: boolean;
}

export const Tab: FC<TabProps> = ({ value, children, className = "", disabled = false }) => {
  const context = useContext(TabsContext);
  if (!context) throw new Error("Tab must be used within Tabs");

  const { activeTab, setActiveTab } = context;
  const isActive = activeTab === value;

  return (
    <button
      onClick={() => !disabled && setActiveTab(value)}
      className={`
        px-4 py-2 font-medium text-sm transition-colors relative
        ${isActive 
          ? "text-gopher-500 dark:text-gopher-400 border-b-2 border-gopher-500 dark:border-gopher-400" 
          : "text-smoke-600 dark:text-smoke-300 hover:text-gopher-500 dark:hover:text-gopher-400"
        }
        ${disabled 
          ? "opacity-50 cursor-not-allowed" 
          : "cursor-pointer"
        }
        ${className}
      `}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

interface TabPanelProps {
  value: string;
  children: ReactNode;
  className?: string;
}

export const TabPanel: FC<TabPanelProps> = ({ value, children, className = "" }) => {
  const context = useContext(TabsContext);
  if (!context) throw new Error("TabPanel must be used within Tabs");

  const { activeTab } = context;
  if (activeTab !== value) return null;

  return <div className={className}>{children}</div>;
};