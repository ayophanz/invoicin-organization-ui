<template>
  <div class="mb-2 select-component">
    <label
      v-if="props.label"
      :for="props.name"
      class="block text-sm font-medium text-slate-700 text-left"
      >{{ props.label }}</label
    >
    <div class="mt-1 flex flex-col">
      <Select
        v-model="input"
        editable
        :options="props.options"
        optionLabel="name"
        placeholder="Select a Country"
        :invalid="props.errorMessage != ''"
        :aria-describedby="`${props.name}-help`"
        @update:modelValue="(value: TmodelValue) => onChange(value)"
        class="rounded-full w-full"
        :pt="{ label: 'rounded-full focus:ring-0' }"
      />
      <small
        v-if="props.errorMessage"
        :id="`${props.name}-help`"
        class="text-sm text-red-500"
        >{{ props.errorMessage }}</small
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import Select from "primevue/select";

const emit = defineEmits(["onchangeData"]);

type TmodelValue = {
  name: string;
};

const props = defineProps({
  name: {
    type: String,
    default: "",
  },
  label: {
    type: String,
    default: "",
  },
  value: {
    type: String,
    default: "",
  },
  options: {
    type: Array<{ id: String; name: String }>,
    default: [],
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

let onChange = (value: { name: string }) => {
  emit("onchangeData", { name: props.name, value: value.name });
};
</script>
