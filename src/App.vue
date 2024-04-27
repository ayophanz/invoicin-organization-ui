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
  import 'floating-vue/dist/style.css';
  import "vue-toastification/dist/index.css";
  import './style.css';
  import Sidebar from './components/Sidebar.vue';
</script>