import "./index.css";

import { render } from "solid-js/web";

import { Route, Router } from "@solidjs/router";
import LoginPage from "./app/auth/login/page";
import AuthLayout from "./app/auth/layout";
import PanelLayout from "./app/panel/layout";
import DashboardPage from "./app/panel/dashboard/page";
render(
  () => (
    <Router>
      <Route path="/auth" component={AuthLayout}>
        <Route path="/login" component={LoginPage} />
      </Route>

      <Route path="/" component={PanelLayout}>
        <Route path="/" component={DashboardPage} />
      </Route>
    </Router>
  ),
  document.querySelector("body")
);
