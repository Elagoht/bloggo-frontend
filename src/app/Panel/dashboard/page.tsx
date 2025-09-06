import {
  IconCalendar,
  IconChartPie,
  IconFileText,
  IconHistory,
  IconTag,
  IconUsers,
} from "@tabler/icons-react";
import { FC, useEffect, useState } from "react";
import RouteGuard from "../../../components/Guards/RouteGuard";
import Container from "../../../components/layout/Container";
import PageTitleWithIcon from "../../../components/layout/Container/PageTitle";
import { getDashboardStats, DashboardStats } from "../../../services/dashboard";

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

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 MB";
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(2)} MB`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <RouteGuard>
      <Container size="xl">
        <PageTitleWithIcon icon={IconChartPie}>Dashboard</PageTitleWithIcon>

        {loading && (
          <div className="text-center py-8">
            Loading dashboard statistics...
          </div>
        )}

        {error && (
          <div className="text-center py-8 text-red-600">
            Error loading dashboard: {error.message}
          </div>
        )}

        {stats && !loading && (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {/* Pending Versions */}
            <div className="bg-white dark:bg-smoke-900 rounded-lg border border-smoke-200 dark:border-smoke-700 p-6">
              <div className="flex items-center gap-3 mb-4">
                <IconFileText className="h-5 w-5 text-gopher-600" />
                <h3 className="text-lg font-semibold text-smoke-900 dark:text-smoke-100">
                  Pending Versions
                </h3>
              </div>
              <div className="space-y-2">
                {!stats.pendingVersions || stats.pendingVersions.length === 0 ? (
                  <p className="text-smoke-500 text-sm">No pending versions</p>
                ) : (
                  stats.pendingVersions.slice(0, 5).map((version) => (
                    <div key={version.id} className="text-sm">
                      <div className="font-medium text-smoke-900 dark:text-smoke-100 truncate">
                        {version.title}
                      </div>
                      <div className="text-smoke-500 text-xs">
                        by {version.authorName} •{" "}
                        {formatDate(version.createdAt)}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white dark:bg-smoke-900 rounded-lg border border-smoke-200 dark:border-smoke-700 p-6">
              <div className="flex items-center gap-3 mb-4">
                <IconHistory className="h-5 w-5 text-gopher-600" />
                <h3 className="text-lg font-semibold text-smoke-900 dark:text-smoke-100">
                  Recent Activity
                </h3>
              </div>
              <div className="space-y-2">
                {!stats.recentActivity || stats.recentActivity.length === 0 ? (
                  <p className="text-smoke-500 text-sm">No recent activity</p>
                ) : (
                  stats.recentActivity.slice(0, 5).map((activity) => (
                    <div key={activity.id} className="text-sm">
                      <div className="font-medium text-smoke-900 dark:text-smoke-100 truncate">
                        {activity.title}
                      </div>
                      <div className="text-smoke-500 text-xs">
                        Published {formatDateTime(activity.publishedAt)}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Publishing Rate */}
            <div className="bg-white dark:bg-smoke-900 rounded-lg border border-smoke-200 dark:border-smoke-700 p-6">
              <div className="flex items-center gap-3 mb-4">
                <IconCalendar className="h-5 w-5 text-gopher-600" />
                <h3 className="text-lg font-semibold text-smoke-900 dark:text-smoke-100">
                  Publishing Rate
                </h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-smoke-600 dark:text-smoke-400">
                    This week
                  </span>
                  <span className="text-sm font-semibold text-smoke-900 dark:text-smoke-100">
                    {stats.publishingRate?.thisWeek || 0}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-smoke-600 dark:text-smoke-400">
                    This month
                  </span>
                  <span className="text-sm font-semibold text-smoke-900 dark:text-smoke-100">
                    {stats.publishingRate?.thisMonth || 0}
                  </span>
                </div>
              </div>
            </div>

            {/* Author Performance */}
            <div className="bg-white dark:bg-smoke-900 rounded-lg border border-smoke-200 dark:border-smoke-700 p-6">
              <div className="flex items-center gap-3 mb-4">
                <IconUsers className="h-5 w-5 text-gopher-600" />
                <h3 className="text-lg font-semibold text-smoke-900 dark:text-smoke-100">
                  Top Authors
                </h3>
              </div>
              <div className="space-y-2">
                {!stats.authorPerformance || stats.authorPerformance.length === 0 ? (
                  <p className="text-smoke-500 text-sm">No published authors</p>
                ) : (
                  stats.authorPerformance.map((author) => (
                    <div
                      key={author.authorId}
                      className="flex justify-between text-sm"
                    >
                      <span className="text-smoke-900 dark:text-smoke-100 truncate">
                        {author.authorName}
                      </span>
                      <span className="text-smoke-500 font-medium ml-2">
                        {author.postCount}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Draft Count */}
            <div className="bg-white dark:bg-smoke-900 rounded-lg border border-smoke-200 dark:border-smoke-700 p-6">
              <div className="flex items-center gap-3 mb-4">
                <IconFileText className="h-5 w-5 text-gopher-600" />
                <h3 className="text-lg font-semibold text-smoke-900 dark:text-smoke-100">
                  Draft Count
                </h3>
              </div>
              <div className="space-y-3">
                <div className="text-2xl font-bold text-gopher-600">
                  {stats.draftCount?.totalDrafts || 0}
                </div>
                <div className="space-y-1">
                  {(!stats.draftCount?.draftsByAuthor || stats.draftCount.draftsByAuthor.length === 0) ? (
                    <p className="text-smoke-500 text-xs">No drafts by author</p>
                  ) : (
                    stats.draftCount.draftsByAuthor.slice(0, 3).map((author) => (
                    <div
                      key={author.authorId}
                      className="flex justify-between text-sm"
                    >
                      <span className="text-smoke-900 dark:text-smoke-100 truncate">
                        {author.authorName}
                      </span>
                      <span className="text-smoke-500 font-medium ml-2">
                        {author.draftCount}
                      </span>
                    </div>
                  ))
                  )}
                </div>
              </div>
            </div>

            {/* Popular Tags */}
            <div className="bg-white dark:bg-smoke-900 rounded-lg border border-smoke-200 dark:border-smoke-700 p-6">
              <div className="flex items-center gap-3 mb-4">
                <IconTag className="h-5 w-5 text-gopher-600" />
                <h3 className="text-lg font-semibold text-smoke-900 dark:text-smoke-100">
                  Popular Tags
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {!stats.popularTags || stats.popularTags.length === 0 ? (
                  <p className="text-smoke-500 text-sm">No tags found</p>
                ) : (
                  stats.popularTags.slice(0, 8).map((tag) => (
                    <span
                      key={tag.id}
                      className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gopher-100 dark:bg-gopher-900 text-gopher-800 dark:text-gopher-200"
                    >
                      {tag.name} ({tag.usage})
                    </span>
                  ))
                )}
              </div>
            </div>

            {/* Storage Usage */}
            <div className="bg-white dark:bg-smoke-900 rounded-lg border border-smoke-200 dark:border-smoke-700 p-6 lg:col-span-2 xl:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <IconChartPie className="h-5 w-5 text-gopher-600" />
                <h3 className="text-lg font-semibold text-smoke-900 dark:text-smoke-100">
                  Storage Usage
                </h3>
              </div>
              <div className="space-y-3">
                <div className="text-2xl font-bold text-gopher-600">
                  {formatFileSize(stats.storageUsage?.totalSizeBytes || 0)}
                </div>
                <div className="text-sm text-smoke-600 dark:text-smoke-400">
                  {stats.storageUsage?.fileCount || 0} files
                </div>
                <div className="text-xs text-smoke-500">
                  Total: {(stats.storageUsage?.totalSizeBytes || 0).toLocaleString()}{" "}
                  bytes
                </div>
              </div>
            </div>
          </div>
        )}
      </Container>
    </RouteGuard>
  );
};

export default DashboardPage;
