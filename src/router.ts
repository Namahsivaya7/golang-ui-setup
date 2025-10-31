import { createRouter } from '@tanstack/react-router'

import { dashboardRoute, homeRoute, signinRoute, verifyPageRoute } from './routes';
import { rootRoute } from './routes/rootRoute';

const routeTree = rootRoute.addChildren([homeRoute,signinRoute,dashboardRoute,verifyPageRoute])

export const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
