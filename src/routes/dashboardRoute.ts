import { createRoute } from "@tanstack/react-router";

import Dashboard from "../components/admin/Dashboard";
import { rootRoute } from "./rootRoute";

export const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path:"/dashboard",
  component:Dashboard
}) 