<template>
  <div class="mb-2 input-component">
    <div>
      <label
        v-if="props.label !== ''"
        :for="props.name"
        class="block text-sm font-medium text-gray-700 text-left"
        >{{ props.label }}</label
      >
      <div class="mt-1 flex flex-col">
        <span v-if="props.errorMessage !== ''" class="text-sm text-red-500">{{
          props.errorMessage
        }}</span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  value: {
    type: String,
    default: "",
  },
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "",
    required: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  errorMessage: {
    type: String,
    default: "",
  },
});

const search = () => {
  console.log("test");
};

const results = computed(() => {
  return [{}];
});
</script>
