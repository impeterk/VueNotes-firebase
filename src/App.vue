<template>
  <NavBar />
  <div class="container is-max-desktop px-2 py-4">
    <RouterView />
  </div>
</template>

<script setup>
import NavBar from "@/components/Layout/NavBar.vue";
import { useStoreAuth } from "@/stores/storeAuth";
import { useStoreTheme } from "@/stores/storeTheme";
import { onMounted } from "vue";
// store

const storeAuth = useStoreAuth();
const storeTheme = useStoreTheme();
// mounted

onMounted(() => {
  storeAuth.init();
  storeTheme.init();
});
</script>

<style>
@import "bulma/css/bulma.min.css";
@import "bulma-switch/dist/css/bulma-switch.min.css";
#app {
  min-height: 100svh;
}
</style>
