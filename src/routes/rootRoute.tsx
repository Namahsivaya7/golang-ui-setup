import { createRootRoute } from "@tanstack/react-router";
import Notfound from "../components/Notfound";
import Root from "./__root";


export const rootRoute = createRootRoute({
  component: Root,
  notFoundComponent: Notfound,
});
