import { defineStore } from "pinia";

export const useStoreTheme = defineStore("storeTheme", {
  state: () => {
    return {
      darkTheme: false,
    };
  },
  actions: {
    init() {
      if (localStorage.getItem("darkTheme") == "true") {
        this.darkTheme = true;
      }
    },
    switchTheme() {
      this.darkTheme = !this.darkTheme;
      localStorage.setItem("darkTheme", this.darkTheme);
    },
  },
  getters: {
    getTheme: (state) => {
      return state.darkTheme;
    },
  },
});
