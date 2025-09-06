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
import PermissionGuard from "../../../components/Guards/PermissionGuard";
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
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {/* Pending Versions */}
            <PermissionGuard permission="post:publish">
              <div className="bg-smoke-50 dark:bg-smoke-950 rounded-xl border border-smoke-200/60 dark:border-smoke-700/60 p-4">
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-2 bg-gopher-100 dark:bg-gopher-900/30 rounded-lg">
                    <IconFileText className="h-5 w-5 text-gopher-600 dark:text-gopher-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-smoke-900 dark:text-smoke-100">
                    Pending Versions
                  </h3>
                </div>
                {!stats?.pendingVersions ||
                stats.pendingVersions.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="w-12 h-12 bg-smoke-100 dark:bg-smoke-800 rounded-full flex items-center justify-center mx-auto mb-3">
                      <IconFileText className="w-4 h-4 text-smoke-400" />
                    </div>
                    <p className="text-smoke-500 text-sm">
                      No pending versions
                    </p>
                  </div>
                ) : (
                  stats.pendingVersions.slice(0, 5).map((version) => (
                    <div
                      key={version.id}
                      className="bg-smoke-50 dark:bg-smoke-800/50 rounded-lg p-3 hover:bg-smoke-100 dark:hover:bg-smoke-800 transition-colors duration-150"
                    >
                      <div className="font-medium text-smoke-900 dark:text-smoke-100 truncate mb-1">
                        {version.title}
                      </div>
                      <div className="text-smoke-500 dark:text-smoke-400 text-xs flex items-center gap-1">
                        <span>by {version.authorName}</span>
                        <span className="w-1 h-1 bg-smoke-400 rounded-full"></span>
                        <span>{formatDate(version.createdAt)}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </PermissionGuard>

            {/* Recent Activity */}
            <PermissionGuard permission="auditlog:view">
              <div className="bg-smoke-50 dark:bg-smoke-950 rounded-xl border border-smoke-200/60 dark:border-smoke-700/60 p-4">
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-2 bg-smoke-100 dark:bg-smoke-800 rounded-lg">
                    <IconHistory className="h-5 w-5 text-gopher-600 dark:text-gopher-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-smoke-900 dark:text-smoke-100">
                    Recent Activity
                  </h3>
                </div>
                {!stats?.recentActivity || stats.recentActivity.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="w-12 h-12 bg-smoke-100 dark:bg-smoke-800 rounded-full flex items-center justify-center mx-auto mb-3">
                      <IconHistory className="w-4 h-4 text-smoke-400" />
                    </div>
                    <p className="text-smoke-500 text-sm">No recent activity</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {stats.recentActivity.slice(0, 5).map((activity) => (
                      <div
                        key={activity.id}
                        className="bg-smoke-50 dark:bg-smoke-800/50 rounded-lg p-3 hover:bg-smoke-100 dark:hover:bg-smoke-800 transition-colors duration-150"
                      >
                        <div className="font-medium text-smoke-900 dark:text-smoke-100 truncate mb-1">
                          {activity.title}
                        </div>
                        <div className="text-smoke-500 dark:text-smoke-400 text-xs flex items-center gap-1">
                          <span>Published</span>
                          <span className="w-1 h-1 bg-smoke-400 rounded-full"></span>
                          <span>{formatDateTime(activity.publishedAt)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </PermissionGuard>

            {/* Publishing Rate */}
            <PermissionGuard
              permission={[
                "statistics:view-others",
                "statistics:view-total",
                "statistics:view-self",
              ]}
            >
              <div className="bg-smoke-50 dark:bg-smoke-950 rounded-xl border border-smoke-200/60 dark:border-smoke-700/60 p-4">
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-2 bg-gopher-100 dark:bg-gopher-900/30 rounded-lg">
                    <IconCalendar className="h-5 w-5 text-gopher-600 dark:text-gopher-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-smoke-900 dark:text-smoke-100">
                    Publishing Rate
                  </h3>
                </div>
                <div className="space-y-4">
                  <div className="bg-smoke-50 dark:bg-smoke-800/50 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-smoke-600 dark:text-smoke-400">
                        This week
                      </span>
                      <span className="text-2xl font-bold text-gopher-600 dark:text-gopher-400">
                        {stats.publishingRate?.thisWeek || 0}
                      </span>
                    </div>
                  </div>
                  <div className="bg-smoke-50 dark:bg-smoke-800/50 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-smoke-600 dark:text-smoke-400">
                        This month
                      </span>
                      <span className="text-2xl font-bold text-smoke-600 dark:text-smoke-400">
                        {stats.publishingRate?.thisMonth || 0}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </PermissionGuard>

            {/* Author Performance */}
            <PermissionGuard
              permission={[
                "statistics:view-others",
                "statistics:view-total",
                "user:list",
              ]}
            >
              <div className="bg-smoke-50 dark:bg-smoke-950 rounded-xl border border-smoke-200/60 dark:border-smoke-700/60 p-4">
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-2 bg-smoke-100 dark:bg-smoke-800 rounded-lg">
                    <IconUsers className="h-5 w-5 text-gopher-600 dark:text-gopher-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-smoke-900 dark:text-smoke-100">
                    Top Authors
                  </h3>
                </div>
                {!stats?.authorPerformance ||
                stats.authorPerformance.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="w-12 h-12 bg-smoke-100 dark:bg-smoke-800 rounded-full flex items-center justify-center mx-auto mb-3">
                      <IconUsers className="w-4 h-4 text-smoke-400" />
                    </div>
                    <p className="text-smoke-500 text-sm">
                      No published authors
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {stats?.authorPerformance?.map((author, index) => (
                      <div
                        key={author.authorId}
                        className="flex items-center justify-between bg-smoke-50 dark:bg-smoke-800/50 rounded-lg p-3 hover:bg-smoke-100 dark:hover:bg-smoke-800 transition-colors duration-150"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-4 h-4 rounded-full flex items-center justify-center text-xs font-bold bg-gopher-100 dark:bg-gopher-900/30 text-gopher-700 dark:text-gopher-300">
                            {index + 1}
                          </div>
                          <span className="text-smoke-900 dark:text-smoke-100 font-medium truncate">
                            {author.authorName}
                          </span>
                        </div>
                        <span className="text-gopher-600 dark:text-gopher-400 font-bold">
                          {author.postCount}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </PermissionGuard>

            {/* Draft Count */}
            <PermissionGuard
              permission={["statistics:view-self", "post:create"]}
            >
              <div className="bg-smoke-50 dark:bg-smoke-950 rounded-xl border border-smoke-200/60 dark:border-smoke-700/60 p-4">
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-2 bg-warning-100 dark:bg-warning-900/30 rounded-lg">
                    <IconFileText className="h-5 w-5 text-warning-600 dark:text-warning-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-smoke-900 dark:text-smoke-100">
                    Draft Count
                  </h3>
                </div>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-warning-600 dark:text-warning-400 mb-2">
                      {stats?.draftCount?.totalDrafts || 0}
                    </div>
                    <div className="text-sm text-smoke-500 dark:text-smoke-400">
                      Total Drafts
                    </div>
                  </div>
                  <div className="space-y-2">
                    {!stats?.draftCount?.draftsByAuthor ||
                    stats.draftCount.draftsByAuthor.length === 0 ? (
                      <div className="text-center py-4">
                        <p className="text-smoke-500 text-sm">
                          No drafts by author
                        </p>
                      </div>
                    ) : (
                      stats?.draftCount?.draftsByAuthor
                        ?.slice(0, 3)
                        .map((author) => (
                          <div
                            key={author.authorId}
                            className="flex justify-between items-center bg-smoke-50 dark:bg-smoke-800/50 rounded-lg p-2 text-sm"
                          >
                            <span className="text-smoke-900 dark:text-smoke-100 truncate">
                              {author.authorName}
                            </span>
                            <span className="text-warning-600 dark:text-warning-400 font-semibold">
                              {author.draftCount}
                            </span>
                          </div>
                        ))
                    )}
                  </div>
                </div>
              </div>
            </PermissionGuard>

            {/* Popular Tags */}
            <PermissionGuard permission={["tag:list", "tag:view"]}>
              <div className="bg-smoke-50 dark:bg-smoke-950 rounded-xl border border-smoke-200/60 dark:border-smoke-700/60 p-4">
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-2 bg-success-100 dark:bg-success-900/30 rounded-lg">
                    <IconTag className="h-5 w-5 text-success-600 dark:text-success-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-smoke-900 dark:text-smoke-100">
                    Popular Tags
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {!stats?.popularTags || stats.popularTags.length === 0 ? (
                    <div className="w-full text-center py-8">
                      <div className="w-12 h-12 bg-smoke-100 dark:bg-smoke-800 rounded-full flex items-center justify-center mx-auto mb-3">
                        <IconTag className="w-4 h-4 text-smoke-400" />
                      </div>
                      <p className="text-smoke-500 text-sm">No tags found</p>
                    </div>
                  ) : (
                    stats?.popularTags?.slice(0, 8).map((tag) => (
                      <span
                        key={tag.id}
                        className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-gradient-to-r from-success-100 to-success-200 dark:from-success-900/30 dark:to-success-800/30 text-success-800 dark:text-success-200 border border-success-200/50 dark:border-success-700/50 hover:scale-105 transition-transform duration-150"
                      >
                        {tag.name}
                        <span className="ml-1 text-success-600 dark:text-success-400 font-semibold">
                          {tag.usage}
                        </span>
                      </span>
                    ))
                  )}
                </div>
              </div>
            </PermissionGuard>

            {/* Storage Usage */}
            <PermissionGuard
              permission={["statistics:view-total", "user:list"]}
            >
              <div className="bg-smoke-50 dark:bg-smoke-950 rounded-xl border border-smoke-200/60 dark:border-smoke-700/60 p-4">
                {" "}
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-2 bg-gopher-100 dark:bg-gopher-900/30 rounded-lg">
                    <IconChartPie className="h-5 w-5 text-gopher-600 dark:text-gopher-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-smoke-900 dark:text-smoke-100">
                    Storage Usage
                  </h3>
                </div>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gopher-600 dark:text-gopher-400 mb-2">
                      {formatFileSize(stats?.storageUsage?.totalSizeBytes || 0)}
                    </div>
                    <div className="text-sm text-smoke-500 dark:text-smoke-400">
                      Used Storage
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-smoke-50 dark:bg-smoke-800/50 rounded-lg p-3 text-center">
                      <div className="text-lg font-semibold text-smoke-900 dark:text-smoke-100">
                        {stats?.storageUsage?.fileCount || 0}
                      </div>
                      <div className="text-xs text-smoke-500 dark:text-smoke-400">
                        Files
                      </div>
                    </div>
                    <div className="bg-smoke-50 dark:bg-smoke-800/50 rounded-lg p-3 text-center">
                      <div className="text-lg font-semibold text-smoke-900 dark:text-smoke-100">
                        {(
                          (stats?.storageUsage?.totalSizeBytes || 0) / 1024
                        ).toFixed(0)}
                        K
                      </div>
                      <div className="text-xs text-smoke-500 dark:text-smoke-400">
                        Total KB
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </PermissionGuard>
          </div>
        )}
      </Container>
    </RouteGuard>
  );
};

export default DashboardPage;
