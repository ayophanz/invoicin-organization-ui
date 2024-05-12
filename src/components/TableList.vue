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
        <tr v-for="(row, key) in body" :key="key">
          <td
            v-for="(column, key2) in row"
            :key="key2"
            class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
          >
            <div v-if="key2.toString() == 'link'">
              <RouterLink :to="column.to.toString()">{{
                column.title.toString()
              }}</RouterLink>
            </div>
            <div v-else v-html="column"></div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
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
  },
});
</script>
