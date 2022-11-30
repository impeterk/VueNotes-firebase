<template>
  <div class="card p-3 mb-6" :class="`has-background-${bgColor}`">
    <label v-if="label" class="label">{{ label }}</label>
    <div class="field">
      <div class="control">
        <textarea
          :value="modelValue"
          class="textarea"
          :placeholder="placeholder"
          ref="focusRef"
          @input="$emit('update:modelValue', $event.target.value)"
          v-autofocus
        />
      </div>
    </div>

    <div class="field is-grouped is-grouped-right">
      <div class="control">
        <slot name="buttons" />
      </div>
    </div>
  </div>
</template>

<script setup>
// imports
import { ref } from "vue";

// props
const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  bgColor: {
    type: String,
    default: "info",
  },
  label: {
    type: String,
  },
  placeholder: {
    type: String,
    default: "Create new note...",
  },
});

// emits
const emit = defineEmits(["update:modelValue"]);

// focus text area
const focusRef = ref(null);

const focusTextarea = () => {
  focusRef.value.focus();
};

defineExpose({
  focusTextarea,
});

// directives

const vAutofocus = {
  mounted: (el) => {
    el.focus();
  },
};
</script>
