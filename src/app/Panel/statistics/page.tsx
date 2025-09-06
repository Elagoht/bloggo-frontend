import { IconChartBar, IconUsers } from "@tabler/icons-react";
import { FC, useEffect, useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "../../../components/common/Tabs";
import RouteGuard from "../../../components/Guards/RouteGuard";
import Container from "../../../components/layout/Container";
import PageTitleWithIcon from "../../../components/layout/Container/PageTitle";
import StatisticsDisplay from "../../../components/pages/Statistics/StatisticsDisplay";
import {
  getAllStatistics,
  getAuthorStatistics,
  getUserOwnStatistics,
} from "../../../services/statistics";
import { getUsers } from "../../../services/users";
import { useAuthStore } from "../../../stores/auth";
import ContentWithSidebar from "../../../components/layout/Container/ContentWithSidebar";

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
    <ContentWithSidebar>
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
              <StatisticsDisplay
                statistics={selfStatistics}
                loading={loadingSelf}
                error={errorSelf}
                showAuthorInfo={false}
                isUserStats={true}
              />
            </TabPanel>
          )}

          {canViewTotal && (
            <TabPanel value="total">
              <StatisticsDisplay
                statistics={totalStatistics}
                loading={loadingTotal}
                error={errorTotal}
                showAuthorInfo={false}
                isUserStats={false}
              />
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
                <StatisticsDisplay
                  statistics={otherUserStatistics}
                  loading={loadingOther}
                  error={errorOther}
                  showAuthorInfo={true}
                  isUserStats={true}
                />
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
    </ContentWithSidebar>
  );
};

export default StatisticsPage;
