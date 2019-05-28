<template>
  <div v-if="!inited">
    <AppLoading />
  </div>
  <div id="app" v-else>
    <AppDialog />
    <AppRoutes :routes="routes" />
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
import Vue from "vue";
import AppLoading from "@/components/AppLoading.vue";
import AppDialog from "@/components/AppDialog.vue";
import AppRoutes from "@/components/AppRoutes.vue";
import { routes } from "@/router";

export default Vue.extend({
  name: "App",
  components: {
    AppLoading,
    AppDialog,
    AppRoutes
  },
  data: function() {
    return { routes };
  },
  computed: {
    inited() {
      return this.$store.state.Initialized;
    }
  }
});
</script>

<style lang="scss" src="@/assets/style.scss"></style>
