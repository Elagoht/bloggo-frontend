import {
  Icon,
  IconAlarm,
  IconBlockquote,
  IconCategory,
  IconChartPie,
  IconClock,
  IconDashboard,
  IconPencilCheck,
  IconProgressCheck,
  IconProps,
  icons,
  IconSignature,
  IconTag,
  IconUsers,
  IconWritingSign,
} from "@tabler/icons-react";

export const asideMenu: Array<{
  name: string;
  icon: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<Icon>>;
  href: string;
  perm?: Permission;
}> = [
  {
    name: "Dashboard",
    icon: IconDashboard,
    href: "/",
  },
  {
    name: "Write",
    icon: IconWritingSign,
    href: "/write",
    perm: "post:create",
  },
  {
    name: "Blogs",
    icon: IconBlockquote,
    href: "/blogs",
    perm: "post:view",
  },
  {
    name: "Awaiting",
    icon: IconProgressCheck,
    href: "/drafts",
    perm: "post:publish",
  },
  {
    name: "Categories",
    icon: IconCategory,
    href: "/categories",
    perm: "category:manage",
  },

  {
    name: "Tags",
    icon: IconTag,
    href: "/tags",
    perm: "tag:manage",
  },
  {
    name: "Statistics",
    icon: IconChartPie,
    href: "/statistics",
    perm: "statistics:view-all",
  },
  {
    name: "Schedules",
    icon: IconAlarm,
    href: "/schedules",
    perm: "schedule:view",
  },
  {
    name: "Users",
    icon: IconUsers,
    href: "/users",
    perm: "user:view",
  },
];
