interface ViewStatistics {
  views_today: number;
  views_this_week: number;
  views_this_month: number;
  views_this_year: number;
  total_views: number;
}

interface HourlyViewCount {
  hour: number;
  view_count: number;
}

interface Last24HoursViews {
  hours: HourlyViewCount[];
}

interface CategoryViewDistribution {
  category_id: number;
  category_name: string;
  view_count: number;
  percentage: number;
}

interface MostViewedBlog {
  post_id: number;
  title: string;
  slug: string;
  view_count: number;
  author: string;
  category_name: string;
}

interface BlogStatistics {
  total_published_blogs: number;
  total_drafted_blogs: number;
  total_pending_blogs: number;
  total_read_time: number;
  average_read_time: number;
  average_views: number;
}

interface CategoryBlogDistribution {
  category_id: number;
  category_name: string;
  blog_count: number;
  percentage: number;
}

interface CategoryReadTimeDistribution {
  category_id: number;
  category_name: string;
  total_read_time: number;
  average_read_time: number;
  percentage: number;
}

interface CategoryLengthDistribution {
  category_id: number;
  category_name: string;
  total_length: number;
  average_length: number;
  percentage: number;
}

interface LongestBlog {
  post_id: number;
  title: string;
  slug: string;
  read_time: number;
  author: string;
  category_name: string;
}

interface UserAgentStat {
  user_agent: string;
  view_count: number;
  percentage: number;
}

interface DeviceTypeStat {
  device_type: string;
  view_count: number;
  percentage: number;
}

interface OSStatistic {
  operating_system: string;
  view_count: number;
  percentage: number;
}

interface BrowserStat {
  browser: string;
  view_count: number;
  percentage: number;
}

interface AuthorStatistics {
  author_id: number;
  author_name: string;
  total_blogs: number;
  total_views: number;
  average_views: number;
  total_read_time: number;
  average_read_time: number;
}

interface ResponseAllStatistics {
  view_statistics: ViewStatistics;
  last_24_hours_views: Last24HoursViews;
  category_views_distribution: CategoryViewDistribution[];
  most_viewed_blogs: MostViewedBlog[];
  blog_statistics: BlogStatistics;
  longest_blogs: LongestBlog[];
  category_blogs_distribution: CategoryBlogDistribution[];
  category_read_time_distribution: CategoryReadTimeDistribution[];
  category_length_distribution: CategoryLengthDistribution[];
  top_user_agents: UserAgentStat[];
  device_type_distribution: DeviceTypeStat[];
  operating_system_distribution: OSStatistic[];
  browser_distribution: BrowserStat[];
}

interface ResponseAuthorStatistics {
  author_statistics: AuthorStatistics;
  view_statistics: ViewStatistics;
  last_24_hours_views: Last24HoursViews;
  category_views_distribution: CategoryViewDistribution[];
  most_viewed_blogs: MostViewedBlog[];
  blog_statistics: BlogStatistics;
  longest_blogs: LongestBlog[];
  category_blogs_distribution: CategoryBlogDistribution[];
  category_read_time_distribution: CategoryReadTimeDistribution[];
  category_length_distribution: CategoryLengthDistribution[];
  top_user_agents: UserAgentStat[];
  device_type_distribution: DeviceTypeStat[];
  operating_system_distribution: OSStatistic[];
  browser_distribution: BrowserStat[];
}
