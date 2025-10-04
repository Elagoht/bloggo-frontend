import { IconChartPie } from "@tabler/icons-react";
import { FC, useEffect, useState } from "react";
import RouteGuard from "../../../components/Guards/RouteGuard";
import PermissionGuard from "../../../components/Guards/PermissionGuard";
import Container from "../../../components/layout/Container";
import PageTitleWithIcon from "../../../components/layout/Container/PageTitle";
import { getDashboardStats } from "../../../services/dashboard";
import PendingVersionsCard from "../../../components/pages/panel/dashboard/PendingVersionsCard";
import DashboardAuditLogCard from "../../../components/pages/panel/dashboard/DashboardAuditLogCard";
import PublishingRateCard from "../../../components/pages/panel/dashboard/PublishingRateCard";
import AuthorPerformanceCard from "../../../components/pages/panel/dashboard/AuthorPerformanceCard";
import DraftCountCard from "../../../components/pages/panel/dashboard/DraftCountCard";
import PopularTagsCard from "../../../components/pages/panel/dashboard/PopularTagsCard";
import StorageUsageCard from "../../../components/pages/panel/dashboard/StorageUsageCard";

const DashboardPage: FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await getDashboardStats();
        if (result.success) {
          setStats(result.data);
        } else {
          setError(new Error("Failed to load dashboard stats"));
        }
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <RouteGuard>
      <Container size="xl">
        <div className="mb-8">
          <PageTitleWithIcon icon={IconChartPie}>Dashboard</PageTitleWithIcon>
          <p className="text-smoke-600 dark:text-smoke-400 mt-2">
            Overview of your content management system
          </p>
        </div>

        {loading && (
          <div className="flex items-center justify-center py-16">
            <div className="flex items-center gap-3">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gopher-600"></div>
              <span className="text-smoke-600 dark:text-smoke-400">
                Loading dashboard statistics...
              </span>
            </div>
          </div>
        )}

        {error && (
          <div className="text-center py-16">
            <div className="bg-danger-50 dark:bg-danger-900/20 rounded-xl p-4 border border-danger-200 dark:border-danger-800 max-w-md mx-auto">
              <div className="text-danger-600 dark:text-danger-400 font-medium mb-1">
                Error loading dashboard
              </div>
              <div className="text-danger-500 dark:text-danger-300 text-sm">
                {error.message}
              </div>
            </div>
          </div>
        )}

        {stats && !loading && (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {/* Pending Versions */}
            <PermissionGuard permission="post:publish">
              <PendingVersionsCard pendingVersions={stats?.pendingVersions} />
            </PermissionGuard>

            {/* Publishing Rate */}
            <PermissionGuard
              permission={[
                "statistics:view-others",
                "statistics:view-total",
                "statistics:view-self",
              ]}
            >
              <PublishingRateCard publishingRate={stats?.publishingRate} />
            </PermissionGuard>

            {/* Author Performance */}
            <PermissionGuard
              permission={[
                "statistics:view-others",
                "statistics:view-total",
                "user:list",
              ]}
            >
              <AuthorPerformanceCard
                authorPerformance={stats?.authorPerformance}
              />
            </PermissionGuard>

            {/* Draft Count */}
            <PermissionGuard
              permission={["statistics:view-self", "post:create"]}
            >
              <DraftCountCard draftCount={stats?.draftCount} />
            </PermissionGuard>

            {/* Popular Tags */}
            <PermissionGuard permission={["tag:list", "tag:view"]}>
              <PopularTagsCard popularTags={stats?.popularTags} />
            </PermissionGuard>

            {/* Storage Usage */}
            <PermissionGuard
              permission={["statistics:view-total", "user:list"]}
            >
              <StorageUsageCard storageUsage={stats?.storageUsage} />
            </PermissionGuard>

            {/* Recent Activity */}
            <PermissionGuard permission="auditlog:view">
              <DashboardAuditLogCard />
            </PermissionGuard>
          </div>
        )}
      </Container>
    </RouteGuard>
  );
};

export default DashboardPage;
