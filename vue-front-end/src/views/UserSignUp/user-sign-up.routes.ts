import { RouteConfig } from "vue-router";
import UserSignUp from "./UserSignUp.vue";

export default [
  {
    path: "/user-sign-up",
    name: "Route.signUp",
    component: UserSignUp,
    meta: { requireAuth: true }
  }
] as RouteConfig[];
