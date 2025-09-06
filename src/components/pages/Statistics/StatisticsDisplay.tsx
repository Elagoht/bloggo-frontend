import {
  IconBrandSpeedtest,
  IconBrowser,
  IconCategory2,
  IconClock,
  IconDeviceDesktop,
  IconDevices,
  IconEmpathize,
  IconEye,
  IconFileText,
  IconRuler,
  IconTrendingUp,
  IconUser,
} from "@tabler/icons-react";
import { FC } from "react";
import BarChart from "../../common/Chart/BarChart";
import PieChart from "../../common/Chart/PieChart";
import TabbedViewsChart from "../../common/TabbedViewsChart";
import StatCard from "../../common/StatCard";
import StatTable from "../../common/StatTable";
import Container from "../../layout/Container";
import CardGrid from "../../layout/Container/CardGrid";
import SectionHeader from "../../layout/SectionHeader";

type StatisticsDisplayProps = {
  statistics: ResponseAllStatistics | ResponseAuthorStatistics | null;
  loading: boolean;
  error: Error | null;
  showAuthorInfo?: boolean;
  isUserStats?: boolean;
};

const StatisticsDisplay: FC<StatisticsDisplayProps> = ({
  statistics,
  loading,
  error,
  showAuthorInfo = false,
  isUserStats = false,
}) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-smoke-500 dark:text-smoke-400">
          Loading statistics...
        </div>
      </div>
    );
  }

  if (error || !statistics) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-red-500">
          {error?.message || "Failed to load statistics"}
        </div>
      </div>
    );
  }

  // Check if this is an author/user stats with no posts
  const isAuthorStats = "authorStatistics" in statistics;
  const hasNoPosts =
    isAuthorStats && statistics.authorStatistics.totalBlogs === 0;

  if (hasNoPosts) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-center max-w-md">
          <IconFileText
            className="mx-auto mb-4 text-smoke-300 dark:text-smoke-600"
            size={64}
          />
          <h3 className="text-lg font-medium text-smoke-900 dark:text-smoke-100 mb-2">
            No posts yet
          </h3>
          <p className="text-smoke-500 dark:text-smoke-400 mb-6">
            {showAuthorInfo && isAuthorStats
              ? `${statistics.authorStatistics.authorName} hasn't published any posts yet. Once they publish their first post, statistics will appear here.`
              : "You haven't published any posts yet. Once you publish your first post, your statistics will appear here."}
          </p>
        </div>
      </div>
    );
  }

  const {
    viewStatistics: viewStats,
    blogStatistics: blogStats,
    last24HoursViews: hourlyViews,
    lastMonthViews: monthViews,
    lastYearViews: yearViews,
    mostViewedBlogs: mostViewed,
    longestBlogs: longestBlogs,
    categoryViewsDistribution: categoryViews,
    categoryBlogsDistribution: categoryBlogs,
    categoryLengthDistribution: categoryLength,
    deviceTypeDistribution: deviceTypes,
    browserDistribution: browsers,
    operatingSystemDistribution: osStats,
  } = statistics;

  return (
    <Container>
      {/* Views Activity */}
      <SectionHeader icon={IconTrendingUp}>Views Activity</SectionHeader>
      <TabbedViewsChart
        hourlyData={hourlyViews.hours}
        dailyData={monthViews?.days || []}
        monthlyData={yearViews?.months || []}
      />

      {/* Overview Stats */}
      <SectionHeader icon={IconEye}>
        {isUserStats
          ? showAuthorInfo
            ? "Statistics Overview"
            : "My Overview"
          : "Site Overview"}
      </SectionHeader>

      <CardGrid>
        <StatCard
          title="Total Views"
          value={viewStats.totalViews}
          icon={IconEye}
          color="primary"
          description="All time page views"
        />
        <StatCard
          title="Published Posts"
          value={blogStats.totalPublishedBlogs}
          icon={IconFileText}
          color="primary"
          description="Live on the site"
        />
        <StatCard
          title="Draft Posts"
          value={blogStats.totalDraftedBlogs}
          icon={IconFileText}
          color="warning"
          description="Work in progress"
        />
        <StatCard
          title="Avg. Read Time"
          value={`${Math.round(blogStats.averageReadTime)} min`}
          icon={IconClock}
          color="primary"
          description="Average time to read posts"
        />
        <StatCard
          title="Avg. Views per Post"
          value={Math.round(blogStats.averageViews)}
          icon={IconEye}
          color="success"
          description="Per post average"
        />
      </CardGrid>

      {/* Content Performance */}
      <SectionHeader icon={IconBrandSpeedtest}>
        Content Performance
      </SectionHeader>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <StatTable
          title="Most Viewed Posts"
          icon={IconEye}
          data={mostViewed}
          columns={[
            { key: "title", title: "Title" },
            ...(!isUserStats ? [{ key: "author", title: "Author" }] : []),
            {
              key: "view_count",
              title: "Views",
              render: (value) => value.toLocaleString(),
            },
          ]}
          maxRows={8}
        />

        <StatTable
          title="Longest Posts"
          icon={IconClock}
          data={longestBlogs}
          columns={[
            { key: "title", title: "Title" },
            ...(!isUserStats ? [{ key: "author", title: "Author" }] : []),
            {
              key: "read_time",
              title: "Read Time",
              render: (value) => `${value} min`,
            },
          ]}
          maxRows={8}
        />
      </div>

      {/* Category Analytics */}
      <SectionHeader icon={IconCategory2}>Category Analytics</SectionHeader>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <PieChart
          title="Views by Category"
          icon={IconEye}
          data={categoryViews.map((cat) => ({
            label: cat.categoryName,
            value: cat.viewCount,
            percentage: cat.percentage,
          }))}
        />

        <PieChart
          title="Posts by Category"
          icon={IconFileText}
          data={categoryBlogs.map((cat) => ({
            label: cat.categoryName,
            value: cat.blogCount,
            percentage: cat.percentage,
          }))}
        />

        <PieChart
          title="Content Length by Category"
          icon={IconRuler}
          data={categoryLength.map((cat) => ({
            label: cat.categoryName,
            value: cat.totalLength,
            percentage: cat.percentage,
          }))}
        />
      </div>

      {/* Audience Analytics */}
      <SectionHeader icon={IconEmpathize}>Audience Analytics</SectionHeader>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <BarChart
          title="Device Types"
          icon={IconDevices}
          data={deviceTypes?.map?.((device) => ({
            label: device.deviceType,
            value: device.viewCount,
            percentage: device.percentage,
          }))}
        />

        <BarChart
          title="Browsers"
          icon={IconBrowser}
          data={browsers?.map?.((browser) => ({
            label: browser.browser,
            value: browser.viewCount,
            percentage: browser.percentage,
          }))}
        />

        <BarChart
          title="Operating Systems"
          icon={IconDeviceDesktop}
          data={osStats?.map?.((os) => ({
            label: os.operatingSystem,
            value: os.viewCount,
            percentage: os.percentage,
          }))}
        />
      </div>
    </Container>
  );
};

export default StatisticsDisplay;
