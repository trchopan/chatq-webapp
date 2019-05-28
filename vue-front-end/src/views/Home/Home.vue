<template>
  <div class="home">
    <h1>{{ $t("App.welcome") }}</h1>
    <button @click="printState()">Print State</button>
    <button @click="generateDialog()">Generate Dialog</button>
    <button @click="switchLanguage()">Switch Language</button>
    <button @click="switchTheme()">Switch Theme</button>
    <form v-if="!user" @submit.prevent="submit(email, password)">
      <label for="email">Email</label>
      <input v-model.trim="email" id="email" type="email" />
      <label for="password">Password</label>
      <input v-model="password" id="password" type="password" />
      <button type="submit">Sign in</button>
    </form>
  </div>
</template>

<script>
import Vue from "vue";
import { ROOT_ACTIONS, ROOT_MUTATIONS } from "@/store/root.store";
import {
  VIETNAMESE_LANGUAGE,
  ENGLISH_LANGUAGE,
  THEME_SETTINGS
} from "@/store/root.models";

export default Vue.extend({
  name: "home",
  data: function() {
    return {
      email: "",
      password: ""
    };
  },
  computed: {
    user() {
      return this.$store.state.CurrentUser;
    }
  },
  methods: {
    async submit(email, password) {
      await this.$store.dispatch(ROOT_ACTIONS.signIn, {
        email,
        password
      });
    },
    printState() {
      this.$store.dispatch(ROOT_ACTIONS.printStoreState);
    },
    generateDialog() {
      this.$store.commit(ROOT_MUTATIONS.ADD_DIALOG, {
        title: this.$t("Dialog.debugTitle"),
        message: this.$t("Dialog.debugMessage") + Math.random()
      });
      this.$store.commit(ROOT_MUTATIONS.ADD_DIALOG, {
        title: this.$t("Dialog.debugTitle"),
        message: this.$t("Dialog.debugMessage") + Math.random()
      });
      this.$store.commit(ROOT_MUTATIONS.ADD_DIALOG, {
        title: this.$t("Dialog.debugTitle"),
        message: this.$t("Dialog.debugMessage") + Math.random()
      });
    },
    async switchLanguage() {
      if (this.$store.state.LanguageSetting.value === "en") {
        await this.$store.dispatch(
          ROOT_ACTIONS.changeLanguage,
          VIETNAMESE_LANGUAGE
        );
      } else {
        await this.$store.dispatch(
          ROOT_ACTIONS.changeLanguage,
          ENGLISH_LANGUAGE
        );
      }
    },
    switchTheme() {
      if (this.$store.state.ThemeSetting.value === "dark") {
        this.$store.dispatch(ROOT_ACTIONS.changeTheme, THEME_SETTINGS[0]);
      } else {
        this.$store.dispatch(ROOT_ACTIONS.changeTheme, THEME_SETTINGS[1]);
      }
    }
  }
});
</script>
