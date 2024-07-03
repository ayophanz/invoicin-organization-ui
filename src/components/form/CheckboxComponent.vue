<template>
  <div class="mb-2 chekcbox-component">
    <div
      :class="errorMessage ? 'border-red-500' : 'border-transparent'"
      class="border rounded-md flex h-6 items-center"
    >
      <Checkbox
        :id="props.name"
        :name="props.name"
        v-model="checkbox"
        binary
        :invalid="props.errorMessage != ''"
        :aria-describedby="`${props.name}-help`"
      />
      <label
        v-if="props.label"
        :for="props.name"
        class="pl-3 cursor-pointer text-sm font-medium text-gray-900"
        >{{ props.label }}</label
      >
    </div>
    <small
      v-if="props.errorMessage"
      class="text-sm text-red-500"
      :id="`${props.name}-help`"
      >{{ props.errorMessage }}</small
    >
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import Checkbox from "primevue/checkbox";

const emit = defineEmits(["onchangeData"]);

const props = defineProps({
  value: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    default: "",
  },
  errorMessage: {
    type: String,
    default: "",
  },
});

let checkbox = ref(props.value);

watch(props, (prop) => {
  checkbox.value = prop.value;
});

watch(checkbox, (value) => {
  emit("onchangeData", { name: props.name, value: value });
});
</script>
