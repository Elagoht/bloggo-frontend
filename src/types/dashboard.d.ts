type PendingVersion = {
  id: number;
  title: string;
  authorId: number;
  authorName: string;
  createdAt: string;
};

type RecentActivity = {
  id: number;
  title: string;
  publishedAt: string;
};

type PublishingRate = {
  thisWeek: number;
  thisMonth: number;
};

type AuthorPerformance = {
  id: number;
  name: string;
  avatar: string;
  postCount: number;
};

type DraftCount = {
  totalDrafts: number;
  draftsByAuthor: DraftsByAuthor[];
};

type DraftsByAuthor = {
  authorId: number;
  authorName: string;
  draftCount: number;
};

type PopularTag = {
  id: number;
  name: string;
  slug: string;
  usage: number;
};

type StorageUsage = {
  filesystemUsedBytes: number;
  filesystemFreeBytes: number;
  bloggoUsedBytes: number;
  fileCount: number;
};

type DashboardStats = {
  pendingVersions: PendingVersion[];
  recentActivity: RecentActivity[];
  publishingRate: PublishingRate;
  authorPerformance: AuthorPerformance[];
  draftCount: DraftCount;
  popularTags: PopularTag[];
  storageUsage: StorageUsage;
};
