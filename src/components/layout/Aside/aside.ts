import {
  Icon,
  IconBlockquote,
  IconCategory,
  IconChartPie,
  IconDashboard,
  IconHistory,
  IconProps,
  IconTag,
  IconTrash,
  IconUsers,
} from "@tabler/icons-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export const asideMenu: Array<{
  name: string;
  icon: ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>;
  href: string;
  perm?: Permission | Permission[];
}> = [
  {
    name: "Dashboard",
    icon: IconDashboard,
    href: "/",
  },
  {
    name: "Posts",
    icon: IconBlockquote,
    href: "/posts",
    perm: "post:view",
  },
  {
    name: "Categories",
    icon: IconCategory,
    href: "/categories",
    perm: "category:list",
  },

  {
    name: "Tags",
    icon: IconTag,
    href: "/tags",
    perm: "tag:list",
  },
  {
    name: "Statistics",
    icon: IconChartPie,
    href: "/statistics",
    perm: "statistics:view-self",
  },
  {
    name: "Users",
    icon: IconUsers,
    href: "/users",
    perm: "user:list",
  },
  {
    name: "Removals",
    icon: IconTrash,
    href: "/removal-requests?status=0",
    perm: "post:delete",
  },
  {
    name: "Audit Logs",
    icon: IconHistory,
    href: "/audit-logs?order=created_at&dir=desc&page=1&take=20&entityType=removal_request%2Cpost%2Ccategory%2Cpost_version%2Ctag%2Cuser&action=approved%2Cassigned%2Cadded%2Ccreated%2Cpublished%2Cdenied%2Cdeleted%2Crejected%2Cremoved%2Crequested%2Csubmitted%2Cunpublished%2Cupdated",
    perm: "auditlog:view",
  },
];
