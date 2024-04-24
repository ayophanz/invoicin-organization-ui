<template>
  <div class="flex h-full flex-col">
    <div class="mx-auto h-full flex w-full max-w-7xl items-start">

      <aside :class="compSideMenuHideToggle ? 'w-44 block' : 'w-0 hidden'" class="sticky h-full shrink-0 py-1 px-2 border-r border-gray-200">
        <div class="flex justify-end mb-2">
            <a href="javascript:;" @click="sideMenuHide()">
              <ArrowLeftIcon class="h-5 w-5 flex-none text-gray-400" aria-hidden="true"/>
            </a>
        </div>
        <ul role="list" class="divide-y divide-gray-100">
          <li v-for="(menu, key) in menus" :key="key" class="relative flex justify-between gap-x-6 py-2">
            <div class="flex min-w-0 gap-x-4">
              <div class="min-w-0 flex-auto">
                <p class="text-sm font-semibold leading-6 text-gray-900">
                  <a href="javascript:;">
                    <span class="absolute inset-x-0 -top-px bottom-0" />
                    {{ menu.name }}
                  </a>
                </p>
              </div>
            </div>
            <div class="flex shrink-0 items-center gap-x-4">
              <div class="hidden sm:flex sm:flex-col sm:items-end">
              </div>
              <ChevronRightIcon class="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
            </div>
          </li>
        </ul>
      </aside>

      <article class="flex-1">
      </article>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { ChevronRightIcon, ArrowLeftIcon } from '@heroicons/vue/solid';

const sideMenuHideToggle = ref(true);

const menus = [
  {
    name: 'General',
    submenu: [
      {
        name: 'Profile',
        href: 'profile'
      },
      {
        name: 'Addresses',
        href: 'addresses'
      },
      {
        name: 'Settings',
        href: 'settings'
      }
    ],
  },
  {
    name: 'Users',
    submenu: [
      {
        name: 'All',
        href: 'all',
      },
      {
        name: 'Active',
        href: 'active',
      },
      {
        name: 'Pending',
        href: 'pending'
      }
    ]
  }
]

const sideMenuHide = () => {
  sideMenuHideToggle.value = !sideMenuHideToggle.value;
};

const compSideMenuHideToggle = computed(() => sideMenuHideToggle.value);
</script>