import firebaseApp from "@/firebase-app";
import { loggerPlugin } from "@/plugins/logger";
import Vue from "vue";
import Vuex from "vuex";
import * as rootStore from "./root.store";
import { loadLanguageAsync } from "@/plugins/i18n";

Vue.use(Vuex);

// NOTE: If you stub CurrentUser, you cannot sign out
const stubState = {
  ...rootStore.state()
  // CurrentUser: {
  // email: "logan1011001@gmail.com",
  // uid: "fhoYr53JioTNBdrkOVHpfALE6wh2",
  // displayName: "Chop chop"
  // } as firebase.User,
  // CurrentUserProfile: {
  // displayName: "Hi I am Chop",
  // email: "logan1011001@gmail.com",
  // init: false,
  // phoneNumber: null,
  // photoURL: "kratos.jpg"
  // }
};

const store = rootStore.store({
  initialState:
    process.env.NODE_ENV !== "production" ? stubState : rootStore.state(),
  extra: {
    i18n: { loadLanguageAsync },
    auth: firebaseApp.auth(),
    firestore: firebaseApp.firestore()
  }
});

export default new Vuex.Store({
  ...store,
  plugins: process.env.NODE_ENV !== "production" ? [loggerPlugin] : []
});
