<template>
  <div class="about">
    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>Stat</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Notes count</td>
          <td>{{ storeNotes.getNotesCount }}</td>
        </tr>
        <tr>
          <td>Characters (all combined)</td>
          <td>{{ storeNotes.getCharactersCount }}</td>
        </tr>
      </tbody>
    </table>
    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>User</th>
          <th>Time of creation</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{ storeAuth.user.email }}</td>
          <td>{{ creationDate }}</td>
        </tr>
      </tbody>
    </table>
    <div class="card">
      <header class="card-header has-background-danger-light">
        <p class="card-header-title has-text-danger">Danger Zone</p>
      </header>
      <div
        class="card-content is-flex is-justify-content-space-between is-align-items-center"
      >
        <p class="title mb-0">Delete Account</p>
        <button
          class="button is-danger is-medium"
          @click.prevent="modals.open = true"
        >
          Delete
        </button>
      </div>
    </div>
    <DangerZone v-if="modals.open" v-model="modals.open" />
  </div>
</template>

<script setup>
// imports
import { useStoreNotes } from "@/stores/storeNotes";
import { useStoreAuth } from "@/stores/storeAuth";
import { useDateFormat } from "@vueuse/core";
import { computed, reactive } from "vue";
import DangerZone from "@/components/DangerZone.vue";
// store
const storeNotes = useStoreNotes();
const storeAuth = useStoreAuth();

// creation date
const creationDate = computed(() => {
  let date = new Date(parseInt(storeAuth.user.createdAt));
  return useDateFormat(date, `DD.MMMM.YYYY HH:mm:ss`).value;
});

// reactive
const modals = reactive({
  open: false,
});
</script>
