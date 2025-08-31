import {
  IconEye,
  IconFileText,
  IconClock,
  IconTrendingUp,
  IconUsers,
  IconChartBar,
  IconBrandSpeedtest,
  IconCategory2,
  IconEmpathize,
  IconUser,
} from "@tabler/icons-react";
import { FC, useEffect, useState } from "react";
import StatCard from "../../../components/common/StatCard";
import SimpleChart from "../../../components/common/SimpleChart";
import StatTable from "../../../components/common/StatTable";
import { Tabs, TabList, Tab, TabPanel } from "../../../components/common/Tabs";
import RouteGuard from "../../../components/Guards/RouteGuard";
import Container from "../../../components/layout/Container";
import CardGrid from "../../../components/layout/Container/CardGrid";
import PageTitleWithIcon from "../../../components/layout/Container/PageTitle";
import SectionHeader from "../../../components/layout/SectionHeader";
import {
  getAllStatistics,
  getUserOwnStatistics,
  getAuthorStatistics,
} from "../../../services/statistics";
import { getUsers } from "../../../services/users";
import { useAuthStore } from "../../../stores/auth";

const StatisticsPage: FC = () => {
  const { hasPermission } = useAuthStore();

  const [totalStatistics, setTotalStatistics] =
    useState<ResponseAllStatistics | null>(null);
  const [selfStatistics, setSelfStatistics] =
    useState<ResponseAuthorStatistics | null>(null);
  const [otherUserStatistics, setOtherUserStatistics] =
    useState<ResponseAuthorStatistics | null>(null);
  const [users, setUsers] = useState<ResponsePaginated<UserCard> | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<string>("");

  const [loadingTotal, setLoadingTotal] = useState(false);
  const [loadingSelf, setLoadingSelf] = useState(false);
  const [loadingOther, setLoadingOther] = useState(false);
  const [loadingUsers, setLoadingUsers] = useState(false);

  const [errorTotal, setErrorTotal] = useState<Error | null>(null);
  const [errorSelf, setErrorSelf] = useState<Error | null>(null);
  const [errorOther, setErrorOther] = useState<Error | null>(null);

  // Cache flags to prevent re-fetching
  const [totalStatisticsFetched, setTotalStatisticsFetched] = useState(false);
  const [selfStatisticsFetched, setSelfStatisticsFetched] = useState(false);
  const [usersFetched, setUsersFetched] = useState(false);

  // Cache for other user statistics to avoid refetching the same user
  const [otherUserStatsCache, setOtherUserStatsCache] = useState<
    Map<string, ResponseAuthorStatistics>
  >(new Map());

  const fetchTotalStatistics = async () => {
    if (totalStatisticsFetched && totalStatistics) {
      return; // Skip if already fetched
    }

    try {
      setLoadingTotal(true);
      setErrorTotal(null);
      const result = await getAllStatistics();
      if (result.success) {
        setTotalStatistics(result.data);
        setTotalStatisticsFetched(true);
      } else {
        setErrorTotal(new Error(result.error.message));
      }
    } catch (err) {
      setErrorTotal(err as Error);
    } finally {
      setLoadingTotal(false);
    }
  };

  const fetchSelfStatistics = async () => {
    if (selfStatisticsFetched && selfStatistics) {
      return; // Skip if already fetched
    }

    try {
      setLoadingSelf(true);
      setErrorSelf(null);
      const result = await getUserOwnStatistics();
      if (result.success) {
        setSelfStatistics(result.data);
        setSelfStatisticsFetched(true);
      } else {
        setErrorSelf(new Error(result.error.message));
      }
    } catch (err) {
      setErrorSelf(err as Error);
    } finally {
      setLoadingSelf(false);
    }
  };

  const fetchOtherUserStatistics = async (userId: string) => {
    // Check cache first
    const cachedData = otherUserStatsCache.get(userId);
    if (cachedData) {
      setOtherUserStatistics(cachedData);
      return;
    }

    try {
      setLoadingOther(true);
      setErrorOther(null);
      const result = await getAuthorStatistics(userId);
      if (result.success) {
        setOtherUserStatistics(result.data);
        // Cache the result
        setOtherUserStatsCache((prev) =>
          new Map(prev).set(userId, result.data)
        );
      } else {
        setErrorOther(new Error(result.error.message));
      }
    } catch (err) {
      setErrorOther(err as Error);
    } finally {
      setLoadingOther(false);
    }
  };

  const fetchUsers = async () => {
    if (usersFetched && users) {
      return; // Skip if already fetched
    }

    try {
      setLoadingUsers(true);
      const result = await getUsers({ take: 9999 });
      if (result.success) {
        setUsers(result.data);
        setUsersFetched(true);
      } else {
        console.error("Users API failed:", result.error);
      }
    } catch (err) {
      console.error("Failed to load users:", err);
    } finally {
      setLoadingUsers(false);
    }
  };

  useEffect(() => {
    if (hasPermission("statistics:view-total")) {
      fetchTotalStatistics();
    }
    if (hasPermission("statistics:view-self")) {
      fetchSelfStatistics();
    }
    if (hasPermission("statistics:view-others")) {
      fetchUsers();
    }
  }, [hasPermission]);

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const userId = event.target.value;
    setSelectedUserId(userId);
    if (userId) {
      fetchOtherUserStatistics(userId);
    } else {
      setOtherUserStatistics(null);
    }
  };

  // Helper component to render statistics content
  const renderStatisticsContent = (
    stats: ResponseAllStatistics | ResponseAuthorStatistics,
    loading: boolean,
    error: Error | null,
    showAuthorInfo = false
  ) => {
    if (loading) {
      return (
        <div className="flex items-center justify-center py-12">
          <div className="text-smoke-500 dark:text-smoke-400">
            Loading statistics...
          </div>
        </div>
      );
    }

    if (error || !stats) {
      return (
        <div className="flex items-center justify-center py-12">
          <div className="text-red-500">
            {error?.message || "Failed to load statistics"}
          </div>
        </div>
      );
    }

    // Check if this is an author/user stats with no posts
    const isAuthorStats = "author_statistics" in stats;
    const hasNoPosts =
      isAuthorStats && stats.author_statistics.total_blogs === 0;

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
              {showAuthorInfo && "author_statistics" in stats
                ? `${stats.author_statistics.author_name} hasn't published any posts yet. Once they publish their first post, statistics will appear here.`
                : "You haven't published any posts yet. Once you publish your first post, your statistics will appear here."}
            </p>
          </div>
        </div>
      );
    }

    const {
      view_statistics: viewStats,
      blog_statistics: blogStats,
      most_viewed_blogs: mostViewed,
      longest_blogs: longestBlogs,
      category_views_distribution: categoryViews,
      category_blogs_distribution: categoryBlogs,
      category_length_distribution: categoryLength,
      device_type_distribution: deviceTypes,
      browser_distribution: browsers,
      operating_system_distribution: osStats,
    } = stats;

    return (
      <Container>
        {/* Author info for individual stats */}
        {showAuthorInfo && "author_statistics" in stats && (
          <>
            <SectionHeader icon={IconUser}>Author Information</SectionHeader>
            <CardGrid>
              <StatCard
                title="Total Blogs"
                value={stats.author_statistics.total_blogs}
                icon={IconFileText}
                color="primary"
                description="Published by this author"
              />
              <StatCard
                title="Total Views"
                value={stats.author_statistics.total_views}
                icon={IconEye}
                color="success"
                description="All-time views"
              />
              <StatCard
                title="Avg. Views per Post"
                value={Math.round(stats.author_statistics.average_views)}
                icon={IconTrendingUp}
                color="success"
                description="Average engagement"
              />
            </CardGrid>
          </>
        )}

        {/* Overview Stats */}
        <SectionHeader icon={IconEye}>Overview</SectionHeader>
        <CardGrid>
          <StatCard
            title="Total Views"
            value={viewStats.total_views}
            icon={IconEye}
            color="primary"
            description="All time page views"
          />
          <StatCard
            title="Views Today"
            value={viewStats.views_today}
            icon={IconTrendingUp}
            color="success"
            description="Views in the last 24 hours"
          />
          <StatCard
            title="Published Posts"
            value={blogStats.total_published_blogs}
            icon={IconFileText}
            color="primary"
            description="Live on the site"
          />
          <StatCard
            title="Draft Posts"
            value={blogStats.total_drafted_blogs}
            icon={IconFileText}
            color="warning"
            description="Work in progress"
          />
          <StatCard
            title="Avg. Read Time"
            value={`${Math.round(blogStats.average_read_time)} min`}
            icon={IconClock}
            color="primary"
            description="Average time to read posts"
          />
          <StatCard
            title="Avg. Views"
            value={Math.round(blogStats.average_views)}
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
            data={mostViewed}
            columns={[
              { key: "title", title: "Title" },
              { key: "author", title: "Author" },
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
            data={longestBlogs}
            columns={[
              { key: "title", title: "Title" },
              { key: "author", title: "Author" },
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
          <SimpleChart
            title="Views by Category"
            type="pie"
            data={categoryViews.map((cat) => ({
              label: cat.category_name,
              value: cat.view_count,
              percentage: cat.percentage,
            }))}
          />

          <SimpleChart
            title="Posts by Category"
            type="pie"
            data={categoryBlogs.map((cat) => ({
              label: cat.category_name,
              value: cat.blog_count,
              percentage: cat.percentage,
            }))}
          />

          <SimpleChart
            title="Content Length by Category"
            type="pie"
            data={categoryLength.map((cat) => ({
              label: cat.category_name,
              value: cat.total_length,
              percentage: cat.percentage,
            }))}
          />
        </div>

        {/* Audience Analytics */}
        <SectionHeader icon={IconEmpathize}>Audience Analytics</SectionHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <SimpleChart
            title="Device Types"
            data={deviceTypes.map((device) => ({
              label: device.device_type,
              value: device.view_count,
              percentage: device.percentage,
            }))}
          />

          <SimpleChart
            title="Browsers"
            type="bar"
            data={browsers.map((browser) => ({
              label: browser.browser,
              value: browser.view_count,
              percentage: browser.percentage,
            }))}
          />

          <SimpleChart
            title="Operating Systems"
            type="bar"
            data={osStats.map((os) => ({
              label: os.operating_system,
              value: os.view_count,
              percentage: os.percentage,
            }))}
          />
        </div>
      </Container>
    );
  };

  // Determine which permissions the user has to show appropriate tabs
  const canViewTotal = hasPermission("statistics:view-total");
  const canViewSelf = hasPermission("statistics:view-self");
  const canViewOthers = hasPermission("statistics:view-others");

  // Determine the default tab
  let defaultTab = "";
  if (canViewSelf) defaultTab = "self";
  else if (canViewTotal) defaultTab = "total";
  else if (canViewOthers) defaultTab = "others";

  // Don't show the page if user has no statistics permissions at all
  if (!canViewTotal && !canViewSelf && !canViewOthers) {
    return (
      <RouteGuard permission="statistics:view-self" redirectTo="/dashboard">
        <Container>
          <PageTitleWithIcon icon={IconChartBar}>Statistics</PageTitleWithIcon>
          <div className="flex items-center justify-center py-12">
            <div className="text-red-500">
              You don't have permission to view statistics.
            </div>
          </div>
        </Container>
      </RouteGuard>
    );
  }

  return (
    <Container>
      <PageTitleWithIcon icon={IconChartBar}>Statistics</PageTitleWithIcon>

      <Tabs defaultTab={defaultTab}>
        <TabList>
          {canViewSelf && <Tab value="self">My Statistics</Tab>}
          {canViewTotal && <Tab value="total">Total Statistics</Tab>}
          {canViewOthers && <Tab value="others">Other Users</Tab>}
        </TabList>

        {canViewSelf && (
          <TabPanel value="self">
            {renderStatisticsContent(
              selfStatistics!,
              loadingSelf,
              errorSelf,
              true
            )}
          </TabPanel>
        )}

        {canViewTotal && (
          <TabPanel value="total">
            {renderStatisticsContent(
              totalStatistics!,
              loadingTotal,
              errorTotal,
              false
            )}
          </TabPanel>
        )}

        {canViewOthers && (
          <TabPanel value="others">
            <div className="mb-6">
              <div className="max-w-md">
                <select
                  value={selectedUserId}
                  onChange={handleUserChange}
                  className="w-full px-3 py-2 text-sm bg-smoke-50 dark:bg-smoke-900 border border-smoke-200 dark:border-smoke-700 rounded-lg transition-all duration-200 focus:outline-none focus:border-gopher-400 dark:focus:border-gopher-500 focus:ring-1 focus:ring-gopher-200 dark:focus:ring-gopher-800/50 placeholder:text-smoke-400 dark:placeholder:text-smoke-500 text-smoke-900 dark:text-smoke-100 shadow-sm focus:shadow hover:border-smoke-300 dark:hover:border-smoke-600"
                >
                  <option value="">
                    {loadingUsers
                      ? "Loading users..."
                      : "Select a user to view their statistics"}
                  </option>
                  {users?.data?.map((user: UserCard) => (
                    <option key={user.id} value={user.id}>
                      {user.name} ({user.email})
                    </option>
                  ))}
                  {!loadingUsers &&
                    (!users || !users.data || users.data.length === 0) && (
                      <option disabled>No users available</option>
                    )}
                </select>
              </div>
            </div>

            {selectedUserId ? (
              renderStatisticsContent(
                otherUserStatistics!,
                loadingOther,
                errorOther,
                true
              )
            ) : (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <IconUsers
                    className="mx-auto mb-4 text-smoke-400 dark:text-smoke-500"
                    size={48}
                  />
                  <div className="text-smoke-500 dark:text-smoke-400">
                    Select a user from the dropdown above to view their
                    statistics
                  </div>
                </div>
              </div>
            )}
          </TabPanel>
        )}
      </Tabs>
    </Container>
  );
};

export default StatisticsPage;
