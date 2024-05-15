<template>
  <div class="flex gap-3 flex-wrap justify-center transition-all items-center">
    <div
      v-for="(card, key) in props.body"
      @click="linkTo(card['linkTo'] ? card['linkTo'].toString() : '')"
      class="cursor-pointer hover:opacity-75 flex flex-col justify-evenly rounded-md flex-none min-h-64 w-64 overflow-hidden border border-gray-100 shadow-lg p-4"
    >
      <div class="flex flex-col gap-y-1">
        <div
          v-for="(item, key2, i) in card"
          :key="i + 1"
          :class="[
            'flex items-center justify-between gap-x-1',
            key2.toString() == 'linkTo' || i > props.label.length - 1
              ? 'hidden'
              : '',
          ]"
        >
          <span v-if="label[i] != ''" class="font-semibold text-sm"
            >{{ label[i] }}:</span
          >
          <div v-html="item"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();
const props = defineProps({
  label: {
    type: Array<String>,
    required: true,
  },
  body: {
    type: Array<any>,
    required: true,
  },
});

const linkTo = (to: string) => {
  router.push({ path: to });
};
</script>
