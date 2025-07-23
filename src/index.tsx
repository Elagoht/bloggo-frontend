import "./design/index.css";

import { render } from "solid-js/web";

import { Route, Router } from "@solidjs/router";
import AuthLayout from "./app/auth/layout";
import LoginPage from "./app/auth/login/page";
import DashboardPage from "./app/panel/dashboard/page";
import PanelLayout from "./app/panel/layout";
import ProfilePage from "./app/panel/profile/page";
import CategoriesPage from "./app/panel/categories/page";
import AuthGuardLayout from "./app/panel/guard";
import CategoryCreatePage from "./app/panel/categories/create/page";
import CategoryEditPage from "./app/panel/categories/edit/[slug]/page";

render(
  () => (
    <Router>
      <Route path="/auth" component={AuthLayout}>
        <Route path="/login" component={LoginPage} />
      </Route>

      <Route path="/" component={AuthGuardLayout}>
        <Route path="/" component={PanelLayout}>
          <Route path="/" component={DashboardPage} />
          <Route path="/profile" component={ProfilePage} />

          <Route path="/categories">
            <Route path="/" component={CategoriesPage} />
            <Route path="/create" component={CategoryCreatePage} />
            <Route path="/edit/:slug" component={CategoryEditPage} />
          </Route>
        </Route>
      </Route>
    </Router>
  ),
  document.querySelector("body")
);
