<template>
  <Button
    :severity="props.severity"
    :label="props.label"
    :icon="props.icon"
    :iconPos="props.iconPos"
    :loading="props.loading"
    class="rounded-full"
    :pt="{ label: 'font-normal text-md' }"
  />
</template>
<script setup lang="ts">
import Button from "primevue/button";

const props = defineProps({
  label: {
    type: String,
    default: "Submit",
  },
  icon: {
    type: String,
    default: "",
    required: false,
  },
  iconPos: {
    type: String,
    default: "left",
    required: false,
  },
  loading: {
    type: Boolean,
    default: false,
    required: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  severity: {
    type: String,
    required: false,
  },
});
</script>
