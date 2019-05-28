import Vue from "vue";
import App from "./App.vue";
import "./plugins/i18n";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import { i18n } from "./plugins/i18n";

Vue.config.productionTip = false;
// Vue.config.devtools = false;

const pkg = require("../package.json");

// eslint-disable-next-line
console.log(`version %c${pkg.version}`, "color: #ed1d24;");
// eslint-disable-next-line
console.log(`author %c${pkg.author}`, "color: #159cd8;");

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount("#app");
