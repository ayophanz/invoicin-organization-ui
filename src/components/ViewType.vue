<template>
  <div
    class="flex divide-x divide-gray-700 border border-gray-700 h-full items-center justify-center rounded-full overflow-hidden"
  >
    <a
      href="javascript:;"
      @click="props.tableNo(false)"
      :class="[
        !props.isTable ? 'bg-gray-700 text-white' : '',
        'hover:bg-gray-700 transition-all hover:text-white py-2 px-3',
      ]"
    >
      <ViewGridIcon class="h-4 w-4"></ViewGridIcon>
    </a>
    <a
      href="javascript:;"
      @click="props.tableYes(true)"
      :class="[
        props.isTable ? 'bg-gray-700 text-white' : '',
        'hover:bg-gray-700 transition-all hover:text-white py-2 px-3',
      ]"
    >
      <ViewListIcon class="h-4 w-4"></ViewListIcon>
    </a>
  </div>
</template>

<script setup lang="ts">
import { ViewGridIcon, ViewListIcon } from "@heroicons/vue/outline";

const props = defineProps({
  tableYes: {
    type: Function,
    required: true,
  },
  tableNo: {
    type: Function,
    required: true,
  },
  isTable: {
    type: Boolean,
    default: true,
  },
});
</script>
