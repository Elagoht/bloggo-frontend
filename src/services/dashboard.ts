import ApiCall from "../utilities/apiCaller";

export interface PendingVersion {
  id: number;
  title: string;
  authorId: number;
  authorName: string;
  createdAt: string;
}

export interface RecentActivity {
  id: number;
  title: string;
  publishedAt: string;
}

export interface PublishingRate {
  thisWeek: number;
  thisMonth: number;
}

export interface AuthorPerformance {
  authorId: number;
  authorName: string;
  postCount: number;
}

export interface DraftCount {
  totalDrafts: number;
  draftsByAuthor: DraftsByAuthor[];
}

export interface DraftsByAuthor {
  authorId: number;
  authorName: string;
  draftCount: number;
}

export interface PopularTag {
  id: number;
  name: string;
  usage: number;
}

export interface StorageUsage {
  totalSizeBytes: number;
  totalSizeMB: number;
  fileCount: number;
}

export interface DashboardStats {
  pendingVersions: PendingVersion[];
  recentActivity: RecentActivity[];
  publishingRate: PublishingRate;
  authorPerformance: AuthorPerformance[];
  draftCount: DraftCount;
  popularTags: PopularTag[];
  storageUsage: StorageUsage;
}

export const getDashboardStats = async () => {
  return ApiCall.get<DashboardStats>("/dashboard/stats");
};