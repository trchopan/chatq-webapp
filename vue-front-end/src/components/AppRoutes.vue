<template functional>
  <div id="nav">
    <div
      v-for="(route, index) in props.routes"
      :key="'route-' + route.path"
      class="d-inline"
    >
      <router-link :to="route.path">{{ parent.$t(route.name) }}</router-link>
      <span v-if="index < props.routes.length - 1"> | </span>
    </div>
  </div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  props: {
    routes: {
      type: Array,
      required: true
    }
  }
});
</script>

<style scoped lang="scss">
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: var(--theme-color);
    &.router-link-exact-active {
      color: var(--theme-link);
    }
  }
}
</style>
