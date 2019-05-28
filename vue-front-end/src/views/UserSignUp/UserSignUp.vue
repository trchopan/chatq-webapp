<template>
  <div class="hello">
    <h1>{{ $t("UserSignUp.hello") }}</h1>
    <pre>{{ JSON.stringify(CurrentUserProfile, null, 2) }}</pre>
    <button @click="signOut()">Sign Out</button>
  </div>
</template>

<script>
import Vue from "vue";
import { ROOT_ACTIONS } from "@/store/root.store";

export default Vue.extend({
  name: "UserSignUp",
  computed: {
    CurrentUserProfile() {
      return this.$store.state.CurrentUserProfile;
    }
  },
  methods: {
    async signOut() {
      await this.$store.dispatch(ROOT_ACTIONS.signOut);
      this.$router.push("/");
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
