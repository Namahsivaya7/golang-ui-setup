import { createRoute } from "@tanstack/react-router"

import VerifyPage from "../components/auth/VerifyPage"
import { rootRoute } from "./rootRoute"

export const verifyPageRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/verify/$id",
  component: VerifyPage,
})

