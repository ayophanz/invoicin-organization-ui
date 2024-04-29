<template>
  <div class="organization-app flex h-full flex-col">
    <div class="mx-auto h-full flex w-full items-start">
      <Sidebar></Sidebar>
      <article class="flex-1 h-full mx-4">
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
  import { onMounted } from 'vue';
  import services from './services';

  onMounted(async () => {
    //await services.me();
  });
</script>