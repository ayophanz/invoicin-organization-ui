<template>
  <div class="flex h-full flex-col">
    <div class="mx-auto h-full flex w-full max-w-7xl items-start">
      <aside class="sticky h-full w-44 shrink-0 block py-1 px-2 border-r border-gray-200">
        <ul role="list" class="divide-y divide-gray-100">
          <li v-for="(menu, key) in menus" :key="key" class="relative flex justify-between gap-x-6 py-5">
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
import { ChevronRightIcon } from '@heroicons/vue/solid';

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
</script>