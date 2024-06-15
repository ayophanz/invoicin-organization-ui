<template>
  <div
    class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg"
  >
    <table class="min-w-full divide-y divide-gray-300">
      <thead class="bg-gray-50">
        <tr>
          <th
            v-for="(head, key) in props.head"
            :key="key"
            scope="col"
            :class="[
              key == props.head.length - 1 ? 'pr-4 sm:pr-6 ' : 'px-3',
              key == 0 ? 'py-3.5 pl-4 sm:pl-6' : 'px-3',
            ]"
            class="text-left text-sm font-semibold text-gray-900"
          >
            {{ head }}
          </th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200 bg-white">
        <tr :class="props.body.length == 0 ? 'visible' : 'collapse'">
          <td
            :colspan="props.head.length"
            class="whitespace-nowrap text-sm px-4 sm:px-6 text-center py-5"
          >
            No Data
          </td>
        </tr>
        <tr
          v-for="(row, key) in props.body"
          :key="key"
          @click="linkTo(row['linkTo'] ? row['linkTo'].toString() : '')"
          :class="[
            props.clickableRow ? 'hover:bg-gray-200 cursor-pointer' : '',
          ]"
        >
          <td
            v-for="(column, key2, i) in row"
            :key="i + 1"
            :class="[
              'whitespace-nowrap text-sm text-gray-500 py-4 px-3',
              key2.toString() == 'linkTo' || i > props.head.length - 1
                ? 'hidden'
                : '',
              i == 0 ? 'pl-4 sm:pl-6 pr-3' : '',
              i == props.head.length - 1 ? 'pr-4 sm:pr-6 pl-3' : '',
            ]"
          >
            <div v-if="key2.toString() == 'profileImage'">
              <ProfileImage
                :image="column.image"
                :defaultImage="column.defaultImage"
              ></ProfileImage>
            </div>
            <div v-else v-html="column"></div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import ProfileImage from "./ProfileImage.vue";

const router = useRouter();
const props = defineProps({
  head: {
    type: Array<String>,
    required: true,
  },
  body: {
    type: Array<Array<any>>,
    required: true,
  },
  clickableRow: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const linkTo = (to: string) => {
  if (props.clickableRow) router.push({ path: to });
};
</script>
