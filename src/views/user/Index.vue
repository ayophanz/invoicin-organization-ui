<template>
  <h1 class="text-2xl font-semibold">Users</h1>
  <div class="flex justify-between items-center my-2">
    <div
      class="flex divide-x divide-gray-700 border border-gray-700 h-full items-center justify-center rounded-full overflow-hidden"
    >
      <a
        href="javascript:;"
        @click="onTableView(false)"
        :class="[
          !tableView ? 'bg-gray-700 text-white' : '',
          'hover:bg-gray-700 transition-all hover:text-white py-2 px-3',
        ]"
      >
        <ViewGridIcon class="h-4 w-4"></ViewGridIcon>
      </a>
      <a
        href="javascript:;"
        @click="onTableView(true)"
        :class="[
          tableView ? 'bg-gray-700 text-white' : '',
          'hover:bg-gray-700 transition-all hover:text-white py-2 px-3',
        ]"
      >
        <ViewListIcon class="h-4 w-4"></ViewListIcon>
      </a>
    </div>
    <Button @click="onNew">
      <PlusIcon class="h-auto w-4"></PlusIcon><span>New</span></Button
    >
  </div>
  <div class="mt-5">
    <TableList v-if="tableView" :head="headCol" :body="body"></TableList>
    <CardList v-else :body="body"></CardList>
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch, computed, ref } from "vue";
import { PlusIcon, ViewGridIcon, ViewListIcon } from "@heroicons/vue/outline";
import TableList from "../../components/TableList.vue";
import CardList from "../../components/CardList.vue";
import Button from "../../components/Button.vue";
import services from "../../services";
import { useOrganizationStore } from "../../stores/organization";
import { storeToRefs } from "pinia";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const organizationStore = useOrganizationStore();
const { getUsers } = storeToRefs(organizationStore);
const headCol = ["Image", "First Name", "Last Name", "Email", "Role"];
const tableView = ref(true);

onMounted(async () => {
  await services.users(window.location.search);
  console.log(getUsers.value);
});

watch(route, async () => {
  await services.users(window.location.search);
});

const body = computed(() => {
  return getUsers.value.map(
    (user: {
      image: string;
      firstname: string;
      lastname: string;
      email: string;
      roles: string;
      id: string;
      emailVerified: string;
      createdAt: string;
    }) => ({
      image: `<img src="${user.image}" class="max-h-8 max-w-8 rounded-full object-cover"/>`,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      role: user.roles[0],
      emailVerified: user.emailVerified,
      createdAt: user.createdAt,
      linkTo: `/organization/users/${user.id}`,
    })
  );
});

const onTableView = (isTable: boolean) => {
  tableView.value = isTable;
};

const onNew = () => {
  router.push({ path: "/organization/users/new" });
};
</script>
