import { createRoute } from "@tanstack/react-router";

import Signin from "../components/auth/Signin";
import { rootRoute } from "./rootRoute";

export const signinRoute = createRoute({
    getParentRoute: () => rootRoute,
    path:"/auth/signin",
    component:Signin
})