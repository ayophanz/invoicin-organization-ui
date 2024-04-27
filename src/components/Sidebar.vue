<template>
    <aside :class="compMenuHideToggle ? 'w-44 px-2 border-r' : 'w-0 p-0 border-r-0'" class="transition-all duration-700 py-1 h-full shrink-0  border-gray-200 overflow-hidden">
        <div class="flex justify-end mb-2">
            <a href="javascript:;" @click="menuHide()" :class="compMenuHideToggle ? 'rotate-0' : 'rotate-180'" class="text-white bg-gray-700 transition-all duration-700 absolute rounded-full left-[-16px] p-1">
              <ArrowLeftIcon class="h-5 w-5" aria-hidden="true"/>
            </a>
        </div>
        <ul role="list" class="divide-y divide-gray-100 pt-5 transition-all duration-700" :class="compMenuHideToggle ? 'opactiy-100' : 'opacity-0'">
          <li v-for="(menu, key) in menus" :key="key" class="transition-opacity relative flex justify-between gap-x-1 py-2">
            <div class="flex w-full gap-x-4">
              <div class="min-w-0 flex-auto">
                <p class="text-sm font-semibold leading-6 text-gray-900">
                  <a @click="submenuHide(key)" href="javascript:;" class="w-full block">
                    {{ menu.name }}
                  </a>
                </p>
                <ul :class="menu.active == true ? 'h-full opacity-100' : 'h-0 opacity-0'" class="transition-all duration-500 px-2 overflow-hidden flex flex-col mt-2 gap-y-2">
                  <li v-for="(submenu, key2) in menu.submenu" :key="key2">
                    <RouterLink :to="submenu.to" class="w-full block text-sm hover:bg-gray-700 rounded-md p-1 transition-all hover:text-white">{{ submenu.name }}</RouterLink>
                  </li>
                </ul>
              </div>
            </div>
            <div class="flex shrink-0 items-start">
              <div class="hidden sm:flex sm:flex-col sm:items-end">
              </div>
              <a href="javascript:;" @click="submenuHide(key)" :class="menu.active == true ? 'rotate-180' : 'rotate-0'" class="transition-all duration-700">
                <ChevronDownIcon class="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
              </a>
            </div>
          </li>
        </ul>
    </aside>
</template>
<script setup lang="ts">
    import { ref, computed } from 'vue';
    import { ChevronDownIcon, ArrowLeftIcon } from '@heroicons/vue/outline';

    const menuHideToggle = ref(true);

    const menus = ref([
      {
          name: 'General',
          active: true,
          submenu: [
            {
                name: 'Profile',
                to: '/organization/profile'
            },
            {
                name: 'Addresses',
                to: '/organization/addresses'
            },
            {
                name: 'Settings',
                to: '/organization/settings'
            }
          ],
      },
      {
          name: 'Users',
          active: false,
          submenu: [
            {
                name: 'All',
                to: '/organization/users',
            },
            {
                name: 'Active',
                to: '/organization/users/active',
            },
            {
                name: 'Pending',
                to: '/organization/users/pending'
            }
          ]
      }
    ]);

    const menuHide = () => {
      menuHideToggle.value = !menuHideToggle.value;
    };

    const submenuHide = (key: number) => {
      menus.value[key].active = !menus.value[key].active;
    };

    const compMenuHideToggle = computed(() => menuHideToggle.value);
</script>