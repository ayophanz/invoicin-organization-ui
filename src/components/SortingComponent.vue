<template>
  <div class="">
    <Popover v-slot="{ open }" class="relative">
      <PopoverButton
        :class="open ? 'bg-gray-700' : 'bg-white'"
        class="group inline-flex items-center rounded-md px-3 py-2 text-base font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
      >
        <FunnelIcon
          :class="[open ? 'text-white' : 'text-gray-700', 'h-5 w-auto']"
        ></FunnelIcon>
      </PopoverButton>

      <transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="translate-y-1 opacity-0"
        enter-to-class="translate-y-0 opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="translate-y-0 opacity-100"
        leave-to-class="translate-y-1 opacity-0"
      >
        <PopoverPanel
          class="absolute left-1/2 z-10 mt-3 w-screen max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-md"
        >
          <div class="overflow-hidden rounded-lg shadow-lg ring-1 ring-black/5">
            <div class="relative grid gap-2 bg-white p-4 lg:grid-cols-2">
              <a
                v-for="(item, key) in props.sorts"
                :key="key"
                @click="selected(key)"
                href="javascript:;"
                class="flex items-center rounded-lg p-2 transition duration-150 ease-in-out text-gray-700 hover:text-white hover:bg-gray-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500/50"
              >
                <div class="flex h-5 w-5 shrink-0 items-center justify-center">
                  <div>
                    <Component :is="item.icon" class="h-6 w-auto"></Component>
                  </div>
                </div>
                <div class="ml-4">
                  <p class="text-sm font-medium">
                    {{ item.name }}
                  </p>
                </div>
              </a>
            </div>
          </div>
        </PopoverPanel>
      </transition>
    </Popover>
  </div>
</template>

<script setup lang="ts">
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/vue";
import { FunnelIcon } from "@heroicons/vue/24/outline";

const emit = defineEmits(["onchangeData"]);

const props = defineProps({
  sorts: {
    type: Array<{ id: String; name: String; icon: Function }>,
    required: true,
  },
});

const selected = (key: number) => {
  emit("onchangeData", props.sorts[key].id);
};
</script>
