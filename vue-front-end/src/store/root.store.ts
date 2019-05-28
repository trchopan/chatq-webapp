import { ActionTree, GetterTree, MutationTree } from "vuex";
import { vuexfireMutations, firestoreAction } from "vuexfire";
import { Language } from "@/plugins/i18n";
import { logger } from "@/plugins/logger";
import { darkTheme, lightTheme, setBodyProperties } from "@/themes";
import {
  DARK_THEME,
  IDialog,
  ISetting,
  VIETNAMESE_LANGUAGE,
  IProfile
} from "./root.models";

export const rootStoreNamespace = "[root]";
const log = logger(rootStoreNamespace);

export interface RootState {
  Initialized: boolean;
  LocalStorageAvaiable: boolean;
  ThemeSetting: ISetting;
  LanguageSetting: ISetting;
  AppLoading: boolean;
  AppDialogs: IDialog[];
  CurrentUser: firebase.User | null;
  CurrentUserProfile: IProfile | null;
}

export interface StoreExtra {
  i18n: { loadLanguageAsync: (lang: Language) => Promise<Language> };
  auth: firebase.auth.Auth;
  firestore: firebase.firestore.Firestore;
}

export const ROOT_ACTIONS = {
  initializeApp: "initializeApp",
  signIn: "signIn",
  signOut: "signOut",
  printStoreState: "printStoreState",
  changeTheme: "changeTheme",
  changeLanguage: "changeLanguage",
  bindUserProfile: "bindUserProfile"
};

export const ROOT_MUTATIONS = {
  SET_INITIALIZED: "SET_INITIALIZED",
  SET_LOCALSTORAGE_AVAIABLE: "SET_LOCALSTORAGE_AVAIABLE",
  SET_THEME: "SET_THEME",
  SET_LANGUAGE: "SET_LANGUAGE",
  SET_USER: "SET_USER",
  ADD_DIALOG: "ADD_DIALOG",
  REMOVE_DIALOG: "REMOVE_DIALOG"
};

export const ROOT_BINDING = {
  CurrentUserProfile: "CurrentUserProfile"
};

export const state = (): RootState => ({
  Initialized: false,
  LocalStorageAvaiable: false,
  ThemeSetting: DARK_THEME,
  LanguageSetting: VIETNAMESE_LANGUAGE,
  AppLoading: false,
  AppDialogs: [],
  CurrentUser: null,
  CurrentUserProfile: null
});

export const getters: GetterTree<RootState, RootState> = {
  isDarkTheme: state => state.ThemeSetting.value === DARK_THEME.value
};

export const actions = (
  extra: StoreExtra
): ActionTree<RootState, RootState> => {
  return {
    [ROOT_ACTIONS.initializeApp]: async ({ commit, state, dispatch }) => {
      if (window.localStorage !== undefined) {
        commit(ROOT_MUTATIONS.SET_LOCALSTORAGE_AVAIABLE, true);
        const theme = localStorage.getItem("theme");
        if (theme) {
          dispatch(ROOT_ACTIONS.changeTheme, JSON.parse(theme));
        }
        const language = localStorage.getItem("language");
        if (language) {
          await dispatch(ROOT_ACTIONS.changeLanguage, JSON.parse(language));
        }
      }
      await new Promise(resolve => {
        if (state.CurrentUser && state.CurrentUserProfile) {
          log(
            "Warning current user is stubed. You cannot sign out. " +
              "To unstub, check @/store/index.ts"
          );
          return resolve();
        }
        extra.auth.onAuthStateChanged(user => {
          commit(ROOT_MUTATIONS.SET_USER, user);
          dispatch(ROOT_ACTIONS.bindUserProfile);
          if (!state.Initialized) {
            resolve();
          }
        });
      });
      commit(ROOT_MUTATIONS.SET_INITIALIZED);
    },
    [ROOT_ACTIONS.signIn]: async ({ commit }, { email, password }) => {
      if (extra.auth) {
        try {
          await extra.auth.signInWithEmailAndPassword(email, password);
        } catch (error) {
          commit(ROOT_MUTATIONS.ADD_DIALOG, {
            title: "Error",
            message: `Error recieved ${error.code} - ${error.message}`,
            persistent: true
          });
        }
      }
      return null;
    },
    [ROOT_ACTIONS.bindUserProfile]: firestoreAction(
      ({ state, bindFirestoreRef }) => {
        if (state.CurrentUser) {
          return bindFirestoreRef(
            ROOT_BINDING.CurrentUserProfile,
            extra.firestore.collection("users").doc(state.CurrentUser.uid)
          );
        }
      }
    ),
    [ROOT_ACTIONS.signOut]: async ({ commit }) => {
      if (extra.auth) {
        await extra.auth.signOut();
      }
    },
    [ROOT_ACTIONS.printStoreState]: ({ commit, state }) => {
      // eslint-disable-next-line
      console.log(JSON.stringify(state, null, 2));
    },
    [ROOT_ACTIONS.changeTheme]: ({ commit }, theme) => {
      const properties =
        theme.value === DARK_THEME.value ? darkTheme : lightTheme;
      setBodyProperties(properties);
      commit(ROOT_MUTATIONS.SET_THEME, theme);
    },
    [ROOT_ACTIONS.changeLanguage]: async ({ commit }, lang: ISetting) => {
      commit(ROOT_MUTATIONS.SET_LANGUAGE, lang);
      await extra.i18n.loadLanguageAsync(lang.value as Language);
    }
  };
};

export const mutations: MutationTree<RootState> = {
  [ROOT_MUTATIONS.SET_INITIALIZED](state) {
    state.Initialized = true;
  },
  [ROOT_MUTATIONS.SET_LOCALSTORAGE_AVAIABLE](state, status) {
    state.LocalStorageAvaiable = status;
  },
  [ROOT_MUTATIONS.SET_THEME](state, theme: ISetting) {
    state.ThemeSetting = theme;
    if (state.LocalStorageAvaiable) {
      localStorage.setItem("theme", JSON.stringify(theme));
    }
  },
  [ROOT_MUTATIONS.SET_LANGUAGE](state, language: ISetting) {
    state.LanguageSetting = language;
    if (state.LocalStorageAvaiable) {
      localStorage.setItem("language", JSON.stringify(language));
    }
  },
  [ROOT_MUTATIONS.SET_USER](state, user: firebase.User) {
    const parsedUser = user
      ? ({
          uid: user.uid,
          email: user.email,
          phoneNumber: user.phoneNumber
        } as firebase.User)
      : null;
    state.CurrentUser = parsedUser;
  },
  [ROOT_MUTATIONS.ADD_DIALOG](state, dialog: IDialog) {
    state.AppDialogs.push(dialog);
  },
  [ROOT_MUTATIONS.REMOVE_DIALOG](state) {
    return state.AppDialogs.pop();
  }
};

export const store = (params: {
  initialState: RootState;
  extra: StoreExtra;
}) => ({
  state: params.initialState,
  getters,
  actions: actions(params.extra),
  mutations: {
    ...mutations,
    ...vuexfireMutations
  }
});
