<template>
  <div
    class="card mb-5"
    :class="{
      'has-background-grey has-text-white-ter': themeStore.darkTheme,
    }"
  >
    <div class="card-content">
      <div class="content">
        {{ note.content }}
      </div>
      <div
        class="has-text-grey-light mt-2 is-flex is-justify-content-space-between"
      >
        <small>{{ dateFormatted }}</small>
        <small>{{ charactersLength }}</small>
      </div>
    </div>
    <footer
      class="card-footer"
      :class="{ 'has-background-grey-light': themeStore.darkTheme }"
    >
      <RouterLink
        :to="`/editNote/${note.id}`"
        href="#"
        class="card-footer-item"
      >
        Edit
      </RouterLink>
      <a @click.prevent="modals.deleteNote = true" class="card-footer-item"
        >Delete</a
      >
    </footer>
    <ModalDeleteNote
      v-if="modals.deleteNote"
      v-model="modals.deleteNote"
      :noteId="note.id"
    />
  </div>
</template>

<script setup>
import { computed, reactive } from "vue";
import { useDateFormat } from "@vueuse/core";
import ModalDeleteNote from "@/components/Notes/ModalDeleteNote.vue";
import { useStoreNotes } from "@/stores/storeNotes.js";
import { useStoreTheme } from "@/stores/storeTheme.js";

//store
const notesStore = useStoreNotes();
const themeStore = useStoreTheme();

// props
const props = defineProps({
  note: {
    type: Object,
    required: true,
  },
});

const charactersLength = computed(() => {
  const length = props.note.content.length;
  let description = length > 1 ? "characters" : "character";
  return `${length} ${description}`;
});

// modals

const modals = reactive({
  deleteNote: false,
});

//  date formater

const dateFormatted = computed(() => {
  let date = new Date(props.note.date);

  return useDateFormat(date, `DD.MM.YY @ HH:mm:ss`).value;
});
</script>
