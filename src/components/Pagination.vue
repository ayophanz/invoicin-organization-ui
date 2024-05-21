<template>
  <SlideIn :class="props.loading ? 'visible' : 'invisible'"></SlideIn>
  <nav
    class="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0"
  >
    <div class="-mt-px flex w-0 flex-1">
      <a
        href="javascript:;"
        v-if="props.paginate.links && props.paginate.links[0].url != null"
        @click="navigate(props.paginate.links[0].url)"
        class="inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
      >
        <ArrowLeftIcon class="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
        Previous
      </a>
    </div>
    <div class="hidden md:-mt-px md:flex">
      <a
        href="javascript:;"
        v-for="(link, key) in props.paginate.links"
        @click="navigate(link.url)"
        :key="key"
        :class="[
          key == 0 || key == props.paginate.links.length - 1 ? 'hidden' : '',
          link.active
            ? 'border-gray-700 text-gray-800'
            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
          'inline-flex items-center border-t-2 px-4 pt-4 text-sm font-medium',
        ]"
        >{{ link.label }}</a
      >
    </div>
    <div class="-mt-px flex w-0 flex-1 justify-end">
      <a
        href="javascript:;"
        v-if="
          props.paginate.links &&
          props.paginate.links[props.paginate.links.length - 1].url != null
        "
        @click="
          navigate(props.paginate.links[props.paginate.links.length - 1].url)
        "
        class="inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
      >
        Next
        <ArrowRightIcon class="ml-3 h-5 w-5 text-gray-400" aria-hidden="true" />
      </a>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/vue/24/solid";
import SlideIn from "./SlideIn.vue";

const emit = defineEmits(["onchangePage"]);
const props = defineProps({
  paginate: {
    type: Object,
    required: true,
  },
  loading: {
    type: Boolean,
    required: false,
  },
});

const navigate = (url: string | null) => {
  if (url != null) {
    const params = new URL(url).searchParams;
    if (params.has("page")) {
      emit("onchangePage", params.get("page"));
    }
  }
};
</script>
