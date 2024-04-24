<template>
  <div class="flex h-full flex-col">
    <div class="mx-auto h-full flex w-full items-start">

      <aside :class="compSideMenuHideToggle ? 'w-44 px-2 border-r' : 'w-0 p-0 border-r-0'" class="transition-all duration-700 py-1 h-full shrink-0  border-gray-200 overflow-hidden">
        <div class="flex justify-end mb-2">
            <a href="javascript:;" @click="sideMenuHide()" :class="compSideMenuHideToggle ? 'rotate-0' : 'rotate-180'" class="text-gray-700 hover:text-white hover:bg-gray-700 transition-all duration-700 absolute rounded-full left-1 p-1">
              <ArrowLeftIcon class="h-5 w-5" aria-hidden="true"/>
            </a>
        </div>
        <ul role="list" class="divide-y divide-gray-100 pt-5">
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
import { ChevronRightIcon, ArrowLeftIcon } from '@heroicons/vue/outline';

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