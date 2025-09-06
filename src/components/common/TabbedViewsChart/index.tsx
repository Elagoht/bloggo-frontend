import { FC, useState } from "react";
import { IconClock, IconCalendar, IconCalendarTime } from "@tabler/icons-react";
import classNames from "classnames";
import HourlyViewsChart from "../HourlyViewsChart";
import DailyViewsChart from "../DailyViewsChart";
import MonthlyViewsChart from "../MonthlyViewsChart";

type TabbedViewsChartProps = {
  hourlyData: HourlyViewCount[];
  dailyData: DailyViewCount[];
  monthlyData: MonthlyViewCount[];
};

type TabType = "hours" | "days" | "months";

const TabbedViewsChart: FC<TabbedViewsChartProps> = ({
  hourlyData,
  dailyData,
  monthlyData,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>("hours");

  const tabs = [
    {
      key: "hours" as TabType,
      label: "Last 24 Hours",
      icon: IconClock,
      component: <HourlyViewsChart data={hourlyData} />,
    },
    {
      key: "days" as TabType,
      label: "Last 30 Days",
      icon: IconCalendar,
      component: <DailyViewsChart data={dailyData} />,
    },
    {
      key: "months" as TabType,
      label: "Last 12 Months",
      icon: IconCalendarTime,
      component: <MonthlyViewsChart data={monthlyData} />,
    },
  ];

  return (
    <data>
      {/* Tab Navigation */}
      <nav className="-mb-px ml-3">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={classNames(
                "group inline-flex items-center gap-2 p-2 border-b-2 font-medium text-sm transition-colors",
                {
                  "border-gopher-500 text-gopher-600 dark:text-gopher-400":
                    activeTab === tab.key,
                  "border-transparent text-smoke-500 dark:text-smoke-400 hover:text-smoke-700 dark:hover:text-smoke-200 hover:border-smoke-300 dark:hover:border-smoke-600":
                    activeTab !== tab.key,
                }
              )}
            >
              <Icon size={16} />
              {tab.label}
            </button>
          );
        })}
      </nav>

      {/* Tab Content */}
      <div>{tabs.find((tab) => tab.key === activeTab)?.component}</div>
    </data>
  );
};

export default TabbedViewsChart;
