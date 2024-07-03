<template>
  <div class="mb-2 input-component">
    <div>
      <label
        v-if="props.label"
        :for="props.name"
        class="block text-sm font-medium text-gray-700 text-left"
        >{{ props.label }}</label
      >
      <div class="mt-1 flex flex-col">
        <InputText
          v-model="input"
          :placeholder="props.placeholder"
          :type="props.type"
          :name="props.name"
          :id="props.name"
          :disabled="props.disabled"
          :invalid="props.errorMessage != ''"
          :aria-describedby="`${props.name}-help`"
        />
        <small
          v-if="props.errorMessage"
          :id="`${props.name}-help`"
          class="text-sm text-red-500"
          >{{ props.errorMessage }}</small
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import InputText from "primevue/inputtext";

const emit = defineEmits(["onchangeData"]);

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
  },
  type: {
    type: String,
    default: "text",
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

let input = ref(props.value);

watch(props, (prop) => {
  input.value = prop.value;
});

watch(input, (value) => {
  emit("onchangeData", { name: props.name, value: value });
});
</script>
