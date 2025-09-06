type ViewStatistics = {
  viewsToday: number;
  viewsThisWeek: number;
  viewsThisMonth: number;
  viewsThisYear: number;
  totalViews: number;
};

type HourlyViewCount = {
  hour: number;
  viewCount: number;
};

type Last24HoursViews = {
  hours: HourlyViewCount[];
};

type DailyViewCount = {
  day: number;
  viewCount: number;
};

type LastMonthViews = {
  days: DailyViewCount[];
};

type MonthlyViewCount = {
  year: number;
  month: number;
  viewCount: number;
  date: Date;
};

type LastYearViews = {
  months: MonthlyViewCount[];
};

type CategoryViewDistribution = {
  categoryId: number;
  categoryName: string;
  viewCount: number;
  percentage: number;
};

type MostViewedBlog = {
  postId: number;
  title: string;
  slug: string;
  viewCount: number;
  author: string;
  categoryName: string;
};

type BlogStatistics = {
  totalPublishedBlogs: number;
  totalDraftedBlogs: number;
  totalPendingBlogs: number;
  totalReadTime: number;
  averageReadTime: number;
  averageViews: number;
};

type CategoryBlogDistribution = {
  categoryId: number;
  categoryName: string;
  blogCount: number;
  percentage: number;
};

type CategoryReadTimeDistribution = {
  categoryId: number;
  categoryName: string;
  totalReadTime: number;
  averageReadTime: number;
  percentage: number;
};

type CategoryLengthDistribution = {
  categoryId: number;
  categoryName: string;
  totalLength: number;
  averageLength: number;
  percentage: number;
};

type LongestBlog = {
  postId: number;
  title: string;
  slug: string;
  readTime: number;
  author: string;
  categoryName: string;
};

type UserAgentStat = {
  userAgent: string;
  viewCount: number;
  percentage: number;
};

type DeviceTypeStat = {
  deviceType: string;
  viewCount: number;
  percentage: number;
};

type OSStatistic = {
  operatingSystem: string;
  viewCount: number;
  percentage: number;
};

type BrowserStat = {
  browser: string;
  viewCount: number;
  percentage: number;
};

type AuthorStatistics = {
  authorId: number;
  authorName: string;
  totalBlogs: number;
  totalViews: number;
  averageViews: number;
  totalReadTime: number;
  averageReadTime: number;
};

type ResponseAllStatistics = {
  viewStatistics: ViewStatistics;
  last24HoursViews: Last24HoursViews;
  lastMonthViews: LastMonthViews;
  lastYearViews: LastYearViews;
  categoryViewsDistribution: CategoryViewDistribution[];
  mostViewedBlogs: MostViewedBlog[];
  blogStatistics: BlogStatistics;
  longestBlogs: LongestBlog[];
  categoryBlogsDistribution: CategoryBlogDistribution[];
  categoryReadTimeDistribution: CategoryReadTimeDistribution[];
  categoryLengthDistribution: CategoryLengthDistribution[];
  topUserAgents: UserAgentStat[];
  deviceTypeDistribution: DeviceTypeStat[];
  operatingSystemDistribution: OSStatistic[];
  browserDistribution: BrowserStat[];
};

type ResponseAuthorStatistics = {
  authorStatistics: AuthorStatistics;
  viewStatistics: ViewStatistics;
  last24HoursViews: Last24HoursViews;
  lastMonthViews: LastMonthViews;
  lastYearViews: LastYearViews;
  categoryViewsDistribution: CategoryViewDistribution[];
  mostViewedBlogs: MostViewedBlog[];
  blogStatistics: BlogStatistics;
  longestBlogs: LongestBlog[];
  categoryBlogsDistribution: CategoryBlogDistribution[];
  categoryReadTimeDistribution: CategoryReadTimeDistribution[];
  categoryLengthDistribution: CategoryLengthDistribution[];
  topUserAgents: UserAgentStat[];
  deviceTypeDistribution: DeviceTypeStat[];
  operatingSystemDistribution: OSStatistic[];
  browserDistribution: BrowserStat[];
};
