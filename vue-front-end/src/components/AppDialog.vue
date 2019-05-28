<template>
  <transition name="fade">
    <div v-if="dialog" class="app-dialog">
      <div class="backdrop" @click="notPersistent && dismiss()"></div>
      <div class="container">
        <p>{{ dialog.title }}</p>
        <p>{{ dialog.message }}</p>
        <button @click="dismiss()">{{ $t("Dialog.dismiss") }}</button>
      </div>
    </div>
  </transition>
</template>

<script>
import Vue from "vue";
import { ROOT_MUTATIONS } from "@/store/root.store";

export default Vue.extend({
  name: "Dialog",
  computed: {
    dialog() {
      const d = this.$store.state.AppDialogs;
      return d.length > 0 ? d[d.length - 1] : null;
    },
    notPersistent() {
      return this.dialog ? !this.dialog.persistent : false;
    }
  },
  methods: {
    dismiss() {
      this.$store.commit(ROOT_MUTATIONS.REMOVE_DIALOG);
    }
  }
});
</script>

<style scoped lang="scss">
.app-dialog {
  position: fixed;
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  .backdrop {
    content: "";
    background-color: black;
    opacity: 0.46;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
  .container {
    z-index: 20;
    background-color: var(--theme-background-card);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
    max-width: 80%;
    color: var(--theme-color);
  }
}
</style>
