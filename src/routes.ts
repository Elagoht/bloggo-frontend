import { lazy } from "solid-js";
import type { RouteDefinition } from "@solidjs/router";
import DashboardPage from "./app/panel/dashboard/page";
import PanelLayout from "./app/panel/layout";
import AuthLayout from "./app/auth/layout";
import LoginPage from "./app/auth/login/page";

export const routes: RouteDefinition[] = [
  {
    path: "/",
    component: PanelLayout,
    children: {
      path: "/",
      component: DashboardPage,
    },
  },
  {
    path: "auth",
    component: AuthLayout,
    children: {
      path: "/login",
      component: LoginPage,
    },
  },
];
