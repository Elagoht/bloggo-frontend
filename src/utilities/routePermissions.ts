import { Permission } from './permissions';

export interface RoutePermissionConfig {
  path: string;
  permission?: Permission | Permission[];
  role?: string | string[];
  requireAll?: boolean;
  redirectTo?: string;
}

export const routePermissions: RoutePermissionConfig[] = [
  {
    path: '/panel/users',
    permission: 'user:view',
    redirectTo: '/panel/dashboard'
  },
  {
    path: '/panel/users/create',
    permission: 'user:create',
    redirectTo: '/panel/dashboard'
  },
  {
    path: '/panel/users/edit',
    permission: 'user:update',
    redirectTo: '/panel/dashboard'
  },
  {
    path: '/panel/categories',
    permission: 'category:manage',
    redirectTo: '/panel/dashboard'
  },
  {
    path: '/panel/categories/create',
    permission: 'category:manage',
    redirectTo: '/panel/dashboard'
  },
  {
    path: '/panel/categories/edit',
    permission: 'category:manage',
    redirectTo: '/panel/dashboard'
  },
  {
    path: '/panel/tags',
    permission: 'tag:manage',
    redirectTo: '/panel/dashboard'
  },
  {
    path: '/panel/statistics',
    permission: ['statistics:view-all', 'statistics:view-self'],
    redirectTo: '/panel/dashboard'
  },
  {
    path: '/panel/write',
    permission: 'post:create',
    redirectTo: '/panel/dashboard'
  },
  {
    path: '/panel/blogs',
    permission: 'post:view',
    redirectTo: '/panel/dashboard'
  },
  {
    path: '/panel/drafts',
    permission: 'post:publish',
    redirectTo: '/panel/dashboard'
  },
  {
    path: '/panel/schedules',
    permission: 'schedule:view',
    redirectTo: '/panel/dashboard'
  }
];

export function getRoutePermission(path: string): RoutePermissionConfig | undefined {
  return routePermissions.find(route => 
    route.path === path || path.startsWith(route.path + '/')
  );
}