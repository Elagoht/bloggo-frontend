import { lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./design/index.css";

const AuthLayout = lazy(() => import("./app/auth/layout"));
const LoginPage = lazy(() => import("./app/auth/login/page"));
const Guard = lazy(() => import("./app/panel/guard"));
const PanelLayout = lazy(() => import("./app/panel/Layout"));
const DashboardPage = lazy(() => import("./app/panel/dashboard/page"));
const WritePage = lazy(() => import("./app/panel/write/page"));
const PostsPage = lazy(() => import("./app/panel/posts/page"));
const PostDetailsPage = lazy(
  () => import("./app/panel/posts/details/[slug]/page")
);
const DuplicateVersionPage = lazy(
  () => import("./app/panel/posts/[postId]/versions/[versionId]/duplicate/page")
);
const ViewVersionPage = lazy(
  () => import("./app/panel/posts/[postId]/versions/[versionId]/page")
);
const EditVersionPage = lazy(
  () => import("./app/panel/posts/[postId]/versions/[versionId]/edit/page")
);
const ProfilePage = lazy(() => import("./app/panel/profile/page"));
const EditProfilePage = lazy(() => import("./app/panel/profile/edit/page"));
const CategoriesPage = lazy(() => import("./app/panel/categories/page"));
const CreateCategoryPage = lazy(
  () => import("./app/panel/categories/create/page")
);
const EditCategoryPage = lazy(
  () => import("./app/panel/categories/details/[slug]/page")
);
const UsersPage = lazy(() => import("./app/panel/users/page"));
const CreateUserPage = lazy(() => import("./app/panel/users/create/page"));
const EditUserPage = lazy(() => import("./app/panel/users/details/[id]/page"));
const TagsPage = lazy(() => import("./app/panel/tags/page"));
const CreateTagPage = lazy(() => import("./app/panel/tags/create/page"));
const EditTagPage = lazy(() => import("./app/panel/tags/details/[slug]/page"));
const NotFoundPage = lazy(() => import("./app/panel/404/page"));

const App = () => {
  return (
    <BrowserRouter>
      <Toaster />

      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/auth" element={<AuthLayout />}>
            <Route path="login" element={<LoginPage />} />
          </Route>

          <Route path="/" element={<Guard />}>
            <Route path="/" element={<PanelLayout />}>
              <Route index element={<DashboardPage />} />

              <Route path="write" element={<WritePage />} />

              <Route path="posts">
                <Route index element={<PostsPage />} />

                <Route path="details/:slug" element={<PostDetailsPage />} />

                <Route path=":postId/versions/:versionId">
                  <Route index element={<ViewVersionPage />} />

                  <Route path="duplicate" element={<DuplicateVersionPage />} />

                  <Route path="edit" element={<EditVersionPage />} />
                </Route>
              </Route>

              <Route path="profile">
                <Route index element={<ProfilePage />} />

                <Route path="edit" element={<EditProfilePage />} />
              </Route>

              <Route path="categories">
                <Route index element={<CategoriesPage />} />

                <Route path="create" element={<CreateCategoryPage />} />

                <Route path="details/:slug" element={<EditCategoryPage />} />
              </Route>

              <Route path="users">
                <Route index element={<UsersPage />} />

                <Route path="create" element={<CreateUserPage />} />

                <Route path="details/:id" element={<EditUserPage />} />
              </Route>

              <Route path="tags">
                <Route index element={<TagsPage />} />

                <Route path="create" element={<CreateTagPage />} />

                <Route path="details/:slug" element={<EditTagPage />} />
              </Route>

              {/* Catch-all route for 404 within panel */}
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

const container = document.querySelector("body");
if (!container) {
  throw new Error("Root element not found");
}

const root = createRoot(container);
root.render(<App />);
