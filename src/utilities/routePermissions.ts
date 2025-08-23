export const routePermissions: RoutePermissionConfig[] = [
  {
    path: "/panel/users",
    permission: "user:list",
    redirectTo: "/panel/dashboard",
  },
  {
    path: "/panel/users/create",
    permission: "user:register",
    redirectTo: "/panel/dashboard",
  },
  {
    path: "/panel/users/details",
    permission: "user:view",
    redirectTo: "/panel/dashboard",
  },
  {
    path: "/panel/categories",
    permission: "category:list",
    redirectTo: "/panel/dashboard",
  },
  {
    path: "/panel/categories/create",
    permission: "category:create",
    redirectTo: "/panel/dashboard",
  },
  {
    path: "/panel/categories/details",
    permission: "category:view",
    redirectTo: "/panel/dashboard",
  },
  {
    path: "/panel/tags",
    permission: "tag:list",
    redirectTo: "/panel/dashboard",
  },
  {
    path: "/panel/statistics",
    permission: "statistics:view-total",
    redirectTo: "/panel/dashboard",
  },
  {
    path: "/panel/write",
    permission: "post:create",
    redirectTo: "/panel/dashboard",
  },
  {
    path: "/panel/posts",
    permission: "post:list",
    redirectTo: "/panel/dashboard",
  },
  {
    path: "/panel/drafts",
    permission: "post:publish",
    redirectTo: "/panel/dashboard",
  },
];

export function getRoutePermission(
  path: string
): RoutePermissionConfig | undefined {
  return routePermissions.find(
    (route) => route.path === path || path.startsWith(route.path + "/")
  );
}
