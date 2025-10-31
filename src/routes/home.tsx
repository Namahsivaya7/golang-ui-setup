import { createRoute } from "@tanstack/react-router";
import HomePage from "../components/HomePage";
import { rootRoute } from "./rootRoute";

export const homeRoute = createRoute({
    getParentRoute:() =>rootRoute,
    path:"/home",
    component:HomePage
})