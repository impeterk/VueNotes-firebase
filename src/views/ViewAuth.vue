<template>
  <div class="auth">
    <div class="tabs is-centered">
      <ul>
        <li :class="{ 'is-active': !registerRef }">
          <a
            @click.prevent="registerRef = false"
            :class="{ 'has-text-light': storeTheme.darkTheme && registerRef }"
            >login</a
          >
        </li>
        <li :class="{ 'is-active': registerRef }">
          <a
            @click.prevent="registerRef = true"
            :class="{ 'has-text-light': storeTheme.darkTheme && !registerRef }"
            >register</a
          >
        </li>
      </ul>
    </div>
    <section class="card auth-form">
      <header class="card-header has-text-centered">
        <h2 class="card-header-title is-justify-content-center is-size-4">
          {{ formTitle }}
        </h2>
      </header>
      <div class="card-content">
        <form @submit.prevent="onSubmit">
          <div class="field">
            <label class="label">Email</label>
            <div class="control">
              <input
                v-model="credentials.email"
                class="input"
                type="email"
                placeholder="e.g. alexsmith@gmail.com"
              />
            </div>
          </div>
          <div class="field">
            <label class="label">Password</label>
            <div class="control">
              <input
                v-model="credentials.password"
                class="input"
                type="password"
                placeholder="enter a password"
              />
            </div>
          </div>
          <div class="field is-grouped is-grouped-right">
            <p class="control">
              <button
                type="submit"
                class="button is-info"
                :disabled="!credentials.email || !credentials.password"
              >
                {{ formTitle }}
              </button>
            </p>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>

<script setup>
// imports
import { ref, computed, reactive } from "vue";
import { useStoreAuth } from "@/stores/storeAuth";
import { useStoreTheme } from "@/stores/storeTheme";

// store
const storeAuth = useStoreAuth();
const storeTheme = useStoreTheme();

// register/login

const registerRef = ref(false);

// form title

const formTitle = computed(() => {
  return registerRef.value ? "Register" : "Login";
});

// credentials

const credentials = reactive({
  email: "",
  password: "",
});

const resetCredentials = () => {
  credentials.email = "";
  credentials.password = "";
};
// submit from

const onSubmit = () => {
  if (registerRef.value) {
    storeAuth.registerUser(credentials);
    resetCredentials();
  } else {
    storeAuth.loginUser(credentials);
    resetCredentials();
  }
};
</script>

<style>
.auth-form {
  max-width: 400px;
  margin-inline: auto;
}
</style>
