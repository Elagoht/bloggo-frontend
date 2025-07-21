import { lazy } from "solid-js";
import type { RouteDefinition } from "@solidjs/router";
import Dashboard from "./app/Panel/Dashboard";
import Layout from "./app/Panel/Layout";

export const routes: RouteDefinition[] = [
  {
    path: "/",
    component: Layout,
    children: {
      path: "/",
      component: Dashboard,
    },
  },
];
