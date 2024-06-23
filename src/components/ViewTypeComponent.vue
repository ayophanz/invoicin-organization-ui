<template>
  <div
    class="flex divide-x divide-gray-700 border border-gray-700 h-full items-center justify-center rounded-full overflow-hidden"
  >
    <a
      href="javascript:;"
      @click="props.onView('card')"
      :class="[
        props.view == 'card' ? 'bg-gray-700 text-white' : '',
        'hover:bg-gray-700 transition-all hover:text-white py-2 px-3',
      ]"
    >
      <Squares2X2Icon class="h-4 w-4"></Squares2X2Icon>
    </a>
    <a
      href="javascript:;"
      @click="props.onView('table')"
      :class="[
        props.view == 'table' ? 'bg-gray-700 text-white' : '',
        'hover:bg-gray-700 transition-all hover:text-white py-2 px-3',
      ]"
    >
      <Bars3Icon class="h-4 w-4"></Bars3Icon>
    </a>
  </div>
</template>

<script setup lang="ts">
import { Squares2X2Icon, Bars3Icon } from "@heroicons/vue/24/outline";

const props = defineProps({
  onView: {
    type: Function,
    required: true,
  },
  view: {
    type: String,
    default: true,
  },
});
</script>
