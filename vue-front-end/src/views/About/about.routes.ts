import About from "./About.vue";
import { RouteConfig } from "vue-router";

const aboutRoutes = [
  {
    path: "/about",
    name: "Route.about",
    component: About
  }
] as RouteConfig[];

export const HOME_ROUTE = aboutRoutes[0];

export default aboutRoutes;
