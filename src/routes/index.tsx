import { lazy } from "react";

const AuthLayout = lazy(() => import("../app/auth/layout"));
const Login = lazy(() => import("../app/auth/login/page"));
const Guard = lazy(() => import("../app/panel/guard"));
const PanelLayout = lazy(() => import("../app/panel/Layout"));
const Dashboard = lazy(() => import("../app/panel/dashboard/page"));
const Posts = lazy(() => import("../app/panel/posts/page"));
const CreatePost = lazy(() => import("../app/panel/posts/create/page"));
const PostDetails = lazy(
  () => import("../app/panel/posts/details/[slug]/page")
);
const DuplicateVersion = lazy(
  () =>
    import("../app/panel/posts/[postId]/versions/[versionId]/duplicate/page")
);
const ViewVersion = lazy(
  () => import("../app/panel/posts/[postId]/versions/[versionId]/page")
);
const EditVersion = lazy(
  () => import("../app/panel/posts/[postId]/versions/[versionId]/edit/page")
);
const Profile = lazy(() => import("../app/panel/profile/page"));
const EditProfile = lazy(() => import("../app/panel/profile/edit/page"));
const Categories = lazy(() => import("../app/panel/categories/page"));
const CreateCategory = lazy(
  () => import("../app/panel/categories/create/page")
);
const EditCategory = lazy(
  () => import("../app/panel/categories/details/[slug]/page")
);
const Users = lazy(() => import("../app/panel/users/page"));
const CreateUser = lazy(() => import("../app/panel/users/create/page"));
const EditUser = lazy(() => import("../app/panel/users/details/[id]/page"));
const Tags = lazy(() => import("../app/panel/tags/page"));
const CreateTag = lazy(() => import("../app/panel/tags/create/page"));
const EditTag = lazy(() => import("../app/panel/tags/details/[slug]/page"));
const Statistics = lazy(() => import("../app/panel/statistics/page"));
const AuditLogs = lazy(() => import("../app/panel/audit-logs/page"));
const NotFound = lazy(() => import("../app/panel/404/page"));

export const routes = [
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [{ path: "login", element: <Login /> }],
  },
  {
    path: "/",
    element: <Guard />,
    children: [
      {
        path: "/",
        element: <PanelLayout />,
        children: [
          { index: true, element: <Dashboard /> },

          {
            path: "posts",
            children: [
              { index: true, element: <Posts /> },
              { path: "create", element: <CreatePost /> },
              { path: "details/:slug", element: <PostDetails /> },
              { path: ":postId/details", element: <PostDetails /> },
              {
                path: ":postId/versions/:versionId",
                children: [
                  { index: true, element: <ViewVersion /> },
                  { path: "duplicate", element: <DuplicateVersion /> },
                  { path: "edit", element: <EditVersion /> },
                ],
              },
            ],
          },

          {
            path: "profile",
            children: [
              { index: true, element: <Profile /> },
              { path: "edit", element: <EditProfile /> },
            ],
          },

          {
            path: "categories",
            children: [
              { index: true, element: <Categories /> },
              { path: "create", element: <CreateCategory /> },
              { path: "details/:slug", element: <EditCategory /> },
            ],
          },

          {
            path: "users",
            children: [
              { index: true, element: <Users /> },
              { path: "create", element: <CreateUser /> },
              { path: "details/:id", element: <EditUser /> },
            ],
          },

          {
            path: "tags",
            children: [
              { index: true, element: <Tags /> },
              { path: "create", element: <CreateTag /> },
              { path: "details/:slug", element: <EditTag /> },
            ],
          },

          { path: "statistics", element: <Statistics /> },
          
          { path: "audit-logs", element: <AuditLogs /> },

          // Catch-all 404
          { path: "*", element: <NotFound /> },
        ],
      },
    ],
  },
];
