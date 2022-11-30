<template>
  <div class="modal is-active p-4">
    <div class="modal-background"></div>
    <div ref="modalCardRef" class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Are you sure?</p>
        <button @click="closeModal" class="delete" aria-label="close"></button>
      </header>
      <section class="modal-card-body">
        Your account will be permanently removed
      </section>
      <footer class="modal-card-foot is-justify-content-flex-end">
        <button @click="closeModal" class="button">Cancel</button>
        <button class="button is-danger" @click="storeAuth.removeUser">
          Delete
        </button>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { useStoreAuth } from "@/stores/storeAuth";
import { ref, reactive, onMounted, onUnmounted } from "vue";
import { onClickOutside } from "@vueuse/core";

// store
const storeAuth = useStoreAuth();

// props

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
});

// emits
const emit = defineEmits(["update:modelValue"]);

// close modal
const closeModal = () => {
  emit("update:modelValue", false);
};

// close on click outside

const modalCardRef = ref(null);
onClickOutside(modalCardRef, closeModal);

// close on esc key

const handleKeyboard = (event) => {
  if (event.key === "Escape") closeModal();
};

onMounted(() => {
  document.addEventListener("keyup", handleKeyboard);
});
onUnmounted(() => {
  document.removeEventListener("keyup", handleKeyboard);
});
</script>
