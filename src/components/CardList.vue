<template>
  <div class="flex gap-3 flex-wrap justify-center transition-all items-center">
    <div
      v-for="(item, key) in props.body"
      @click="linkTo(item.linkTo.toString())"
      class="cursor-pointer hover:opacity-75 flex flex-col justify-evenly rounded-md flex-none min-h-64 w-64 overflow-hidden border border-gray-100 shadow-lg p-4"
    >
      <div v-html="item.image"></div>
      <div class="pt-4">
        <div class="font-bold text-xl mb-2">
          <h3>{{ item.firstname }}, {{ item.lastname }}</h3>
        </div>
        <p class="text-gray-700 text-sm mb-1">
          Verified:
          <span class="font-semibold">{{
            item.emailVerified ?? "Pending"
          }}</span>
        </p>
        <p class="text-gray-700 text-sm mb-1">
          Email: <span class="font-semibold">{{ item.email }}</span>
        </p>
        <p class="text-gray-700 text-sm mb-1">
          Created:
          <span class="font-semibold">{{ item.createdAt ?? "None" }}</span>
        </p>
      </div>
      <div class="pt-4">
        <span
          class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
          >{{ item.role }}</span
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();
const props = defineProps({
  body: {
    type: Array<any>,
    required: true,
  },
});

const linkTo = (to: string) => {
  router.push({ path: to });
};
</script>
