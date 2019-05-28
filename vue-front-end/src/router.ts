import { logger } from "@/plugins/logger";
import store from "@/store";
import Vue from "vue";
import VueRouter, { NavigationGuard, Route, RouteRecord } from "vue-router";
import { Store } from "vuex";
import { i18n } from "./plugins/i18n";
import { ROOT_ACTIONS, ROOT_MUTATIONS } from "./store/root.store";
import aboutRoutes from "./views/About/about.routes";
import homeRoutes, { HOME_ROUTE } from "./views/Home/home.routes";
import userSignUpRoutes from "./views/UserSignUp/user-sign-up.routes";

Vue.use(VueRouter);

const log = logger("router");

const checkMetaKey = (matched: RouteRecord[], key: string) =>
  matched.some(record => record.meta[key]);

export const globalGuard = (store: Store<any>): NavigationGuard => async (
  to: Route,
  from: Route,
  next: any
) => {
  log("Navigating to", to.path);
  if (!store.state.Initialized) {
    await store.dispatch(ROOT_ACTIONS.initializeApp);
  }
  if (checkMetaKey(to.matched, "requireAuth") && !store.state.CurrentUser) {
    log("[Warning] This route require authentication");
    store.commit(ROOT_MUTATIONS.ADD_DIALOG, {
      title: i18n.t("Dialog.errorAuth"),
      message: i18n.t("Dialog.requireSignedIn")
    });
    next(HOME_ROUTE);
    return;
  }
  next();
};

export const routes = [homeRoutes, aboutRoutes, userSignUpRoutes].flat();

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: routes
});

router.beforeEach(globalGuard(store));

export default router;
