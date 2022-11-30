<template>
  <div class="edit-note">
    <AddEditNote
      v-model="noteContent"
      ref="addEditRef"
      bgColor="warning"
      label="Edit note"
      placeholder="Edit note"
    >
      <template #buttons>
        <button @click="$router.back()" class="button is-light mx-1">
          Cancel
        </button>
        <button
          @click="handleSaveClicked"
          class="button is-dark mx-1"
          :disabled="!noteContent"
        >
          Save note
        </button>
      </template>
    </AddEditNote>
  </div>
</template>

<script setup>
// imports
import AddEditNote from "@/components/Notes/AddEditNote.vue";
import { useStoreNotes } from "@/stores/storeNotes";
import { useRoute, useRouter } from "vue-router";
import { ref } from "vue";

// store
const notesStore = useStoreNotes();

// route

const route = useRoute();
const router = useRouter();
// note
const noteContent = ref("asdfasdf");
const noteId = route.params.id;
noteContent.value = notesStore.getNoteContent(route.params.id);

// save clicked

const handleSaveClicked = () => {
  notesStore.updateNote(noteId, noteContent.value);
  router.push("/");
};
</script>
