import {
  Icon,
  IconBlockquote,
  IconCategory,
  IconChartPie,
  IconDashboard,
  IconProgressCheck,
  IconProps,
  IconTag,
  IconUsers,
  IconWritingSign,
} from "@tabler/icons-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export const asideMenu: Array<{
  name: string;
  icon: ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>;
  href: string;
  perm?: Permission;
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
];
