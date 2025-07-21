import {
  IconAlarm,
  IconBlockquote,
  IconCategory,
  IconChartPie,
  IconClock,
  IconDashboard,
  IconPencilCheck,
  IconProgressCheck,
  icons,
  IconSignature,
  IconTag,
  IconUsers,
  IconWritingSign,
} from "@tabler/icons-solidjs";

export const asideMenu = [
  {
    name: "Dashboard",
    icon: IconDashboard,
    href: "/",
    perm: null,
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
    requries: "post:view",
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
    perm: "tags:manage",
  },
  {
    name: "Statistics",
    icon: IconChartPie,
    href: "/statistics",
    perm: "statistics:view",
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
    perm: "tags:manage",
  },
];
