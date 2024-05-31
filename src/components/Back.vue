<template>
  <a
    href="javascript:;"
    @click="router.back()"
    class="inline-flex justify-around items-center disabled:opacity-75 rounded-full bg-white p-2 text-sm font-semibold hover:text-white hover:bg-gray-700 hover:ring-white text-gray-700 shadow-sm ring-1 ring-gray-700 transition-all"
  >
    <ArrowUturnLeftIcon class="h-4 w-4"></ArrowUturnLeftIcon>
  </a>
</template>
<script setup lang="ts">
import { ArrowUturnLeftIcon } from "@heroicons/vue/24/outline";
import { useRouter } from "vue-router";

const router = useRouter();
</script>
