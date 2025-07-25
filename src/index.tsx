import { Route, Router } from "@solidjs/router";
import { lazy } from "solid-js";
import { render } from "solid-js/web";
import { Toaster } from "solid-toast";
import "./design/index.css";

render(
  () => (
    <>
      <Toaster />

      <Router>
        <Route path="/auth" component={lazy(() => import("./app/auth/layout"))}>
          <Route
            path="/login"
            component={lazy(() => import("./app/auth/login/page"))}
          />
        </Route>

        <Route path="/" component={lazy(() => import("./app/panel/guard"))}>
          <Route path="/" component={lazy(() => import("./app/panel/layout"))}>
            <Route
              path="/"
              component={lazy(() => import("./app/panel/dashboard/page"))}
            />

            <Route path="/profile">
              <Route
                path="/"
                component={lazy(() => import("./app/panel/profile/page"))}
              />

              <Route
                path="/avatar"
                component={lazy(
                  () => import("./app/panel/profile/avatar/page")
                )}
              />
            </Route>

            <Route path="/categories">
              <Route
                path="/"
                component={lazy(() => import("./app/panel/categories/page"))}
              />
              <Route
                path="/create"
                component={lazy(
                  () => import("./app/panel/categories/create/page")
                )}
              />

              <Route
                path="/edit/:slug"
                component={lazy(
                  () => import("./app/panel/categories/edit/[slug]/page")
                )}
              />
            </Route>
          </Route>
        </Route>
      </Router>
    </>
  ),
  document.querySelector("body")
);
