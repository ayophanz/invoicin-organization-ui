<template>
  <div class="radio-component mb-2">
    <div class="border-0 rounded-md">
      <label
        v-if="props.label"
        class="block text-sm font-medium text-gray-700 text-left"
        >{{ props.label }}</label
      >
      <fieldset class="mt-2">
        <div
          class="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0"
        >
          <div
            v-for="(option, key) in props.options"
            :key="key"
            class="flex items-center"
          >
            <RadioButton
              :id="key.toString()"
              v-model="radio"
              inputId="ingredient1"
              :name="props.name"
              :value="option.value"
              :checked="option.value === radio"
            />
            <label
              :for="key.toString()"
              class="block text-sm font-medium cursor-pointer pl-3 text-gray-900"
              >{{ option.label }}</label
            >
          </div>
        </div>
      </fieldset>
    </div>
    <small
      v-if="props.errorMessage"
      :id="`${props.name}-help`"
      class="text-sm text-red-500"
      >{{ props.errorMessage }}</small
    >
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import RadioButton from "primevue/radiobutton";

const emit = defineEmits(["onchangeData"]);

const props = defineProps({
  value: {
    type: String,
    default: "",
  },
  options: {
    type: Array<{ value: String; label: String }>,
    default: [],
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

let radio = ref(props.value);

watch(props, (prop) => {
  radio.value = prop.value;
});

watch(radio, (value) => {
  emit("onchangeData", { name: props.name, value: value });
});
</script>
