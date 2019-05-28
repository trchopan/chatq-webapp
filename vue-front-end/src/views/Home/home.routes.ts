import Home from "./Home.vue";
import { RouteConfig } from "vue-router";

const homeRoutes = [
  {
    path: "/",
    name: "Route.home",
    component: Home
  }
] as RouteConfig[];

export const HOME_ROUTE = homeRoutes[0];

export default homeRoutes;
