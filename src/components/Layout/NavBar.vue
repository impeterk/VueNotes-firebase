<template>
  <nav class="navbar" :class="themeStore.darkTheme ? 'is-dark' : 'is-info'" role="navigation"
    aria-label="main navigation">
    <div class="container is-max-desktop px-2">
      <div class="navbar-brand">
        <title class="navbar-item is-size-4 has-text-weight-medium is-family-monospace">
          {{ `
          <FireVueNotes />`}}
        </title>

        <a @click.prevent="showMobileNav = !showMobileNav" ref="navBarBurger" role="button" class="navbar-burger"
          :class="{ 'is-active': showMobileNav }" aria-label="menu" aria-expanded="false"
          data-target="navbarBasicExample">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div ref="navBarMenu" id="navbarBasicExample" class="navbar-menu" :class="{ 'is-active': showMobileNav }">
        <div class="navbar-start ml-3 is-align-items-center">
          <button v-if="storeAuth.user.id" type="button" class="button is-small is-danger" @click="logout">
            Logout {{ storeAuth.user.email }}
          </button>
        </div>
        <div class="navbar-end">
          <RouterLink to="/" @click="showMobileNav = !showMobileNav" class="navbar-item" active-class="is-active">Notes
          </RouterLink>
          <RouterLink to="/about" @click="showMobileNav = !showMobileNav" class="navbar-item" active-class="is-active">
            About</RouterLink>
          <a href="https://github.com/impeterk/VueNotes-firebase" @click="showMobileNav = !showMobileNav"
            class="navbar-item image has-text-white" active-class="is-active" target="_blank">
            <img src="/github.svg" alt="github icon"></a>
          <!-- <div class="navbar-item is-pulled-right"> -->
          <!--   <input id="switchColorInfo" :checked="themeStore.getTheme" type="checkbox" name="switchColorInfo" -->
          <!--     class="switch is-rounded is-info" @click="themeStore.switchTheme" /> -->
          <!--   <label for="switchColorInfo">Dark Mode</label> -->
          <!-- </div> -->
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, watch } from "vue";
import { useStoreTheme } from "@/stores/storeTheme.js";
import { onClickOutside } from "@vueuse/core";
import { useStoreAuth } from "@/stores/storeAuth";

//store
const themeStore = useStoreTheme();
const storeAuth = useStoreAuth();

// mobile navigation
const showMobileNav = ref(false);

//dark mode for HTML
watch(
  () => themeStore.darkTheme,
  (darkTheme) => {
    const html = document.querySelector("html");
    if (darkTheme) {
      return html.classList.add("has-background-grey-dark");
    } else {
      return html.classList.remove("has-background-grey-dark");
    }
  }
);

// close on click outside
const navBarMenu = ref(null);
const navBarBurger = ref(null);
onClickOutside(
  navBarMenu,
  () => {
    showMobileNav.value = false;
  },
  { ignore: [navBarBurger] }
);

// logout

const logout = () => {
  showMobileNav.value = false;
  storeAuth.logoutUser();
};
</script>

<style scoped>
@media (max-width: 1023px) {
  .navbar-menu {
    position: absolute;
    left: 0;
    width: 100%;
  }

  .navbar-item.is-active {
    color: hsl(204, 86%, 53%) !important;
  }

  .navbar-item:hover {
    color: hsl(204, 86%, 53%) !important;
  }
}
</style>
