<template>
  <div class="flex h-full flex-col">
    <div class="mx-auto h-full flex w-full items-start">
      <Sidebar></Sidebar>
      <article class="flex-1 h-full">
        <router-view/>
      </article>
    </div>
  </div>
</template>

<script setup lang="ts">
import Sidebar from './components/Sidebar.vue';

</script>