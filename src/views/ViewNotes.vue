<template>
  <div class="notes">
    <AddEditNote v-model="newNote" ref="addEditRef">
      <template #buttons>
        <button @click="addNote" :disabled="!newNote" class="button is-primary">
          Add New note
        </button></template
      >
    </AddEditNote>
    <progress
      v-if="!notesStore.notesLoaded"
      class="progress is-large is-info"
      max="100"
    />
    <template v-else>
      <Note v-for="note in notesStore.notes" :key="note.id" :note="note" />

      <div
        v-if="!notesStore.notes.length"
        class="is-size-3 has-text-centered has-text-info is-family-monospace py-6"
      >
        No notes yet...
      </div>
    </template>
  </div>
</template>

<script setup>
//imports
import { ref } from "vue";
import Note from "@/components/Notes/Note.vue";
import AddEditNote from "@/components/Notes/AddEditNote.vue";
import { useStoreNotes } from "@/stores/storeNotes";

//store

const notesStore = useStoreNotes();

//adding note
const newNote = ref("");
const addEditRef = ref(null);

const addNote = () => {
  notesStore.addNote(newNote.value);
  newNote.value = "";
  addEditRef.value.focusTextarea();
};
</script>
