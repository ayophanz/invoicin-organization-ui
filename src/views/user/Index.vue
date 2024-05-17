<template>
  <h1 class="text-2xl font-semibold">Users</h1>
  <div class="flex justify-between items-center my-2">
    <ViewType
      :tableYes="onTableView"
      :tableNo="onTableView"
      :isTable="tableView"
    ></ViewType>
    <Button @click="onNew">
      <PlusIcon class="h-auto w-4"></PlusIcon><span>New</span></Button
    >
  </div>
  <div class="mt-5">
    <TableList
      v-if="tableView"
      :head="tableHead"
      :body="tableBody"
      :clickableRow="true"
      :loading="loading"
    ></TableList>
    <CardList
      v-else
      :label="cardLabel"
      :body="cardBody"
      :loading="loading"
    ></CardList>
    <div v-if="getPagination" class="mt-5">
      <Pagination
        :paginate="getPagination"
        @onchange-page="changePage"
      ></Pagination>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch, computed, ref } from "vue";
import { PlusIcon } from "@heroicons/vue/24/outline";
import TableList from "../../components/TableList.vue";
import CardList from "../../components/CardList.vue";
import Button from "../../components/Button.vue";
import Pagination from "../../components/Pagination.vue";
import ViewType from "../../components/ViewType.vue";
import services from "../../services";
import { useOrganizationStore } from "../../stores/organization";
import { storeToRefs } from "pinia";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const organizationStore = useOrganizationStore();
const { getUsers, getPagination } = storeToRefs(organizationStore);

const tableHead = ["Image", "First Name", "Last Name", "Email", "Role"];
const cardLabel = ["", "", "Email", "Verified", "Role"];
const tableView = ref(true);
const loading = ref(false);

onMounted(() => {
  urlChange();
});

watch(route, () => {
  urlChange();
});

const urlChange = async () => {
  if (route.query.view && route.query.view == "card") tableView.value = false;
  if (route.query.view && route.query.view == "table") tableView.value = true;

  loading.value = true;
  await services
    .users(window.location.search)
    .then(() => {
      loading.value = false;
    })
    .catch(() => {
      loading.value = false;
    });
};

const changePage = async (page: string | null) => {
  router.replace({
    query: {
      ...route.query,
      page: page,
    },
  });
};

const onTableView = (table: boolean) => {
  tableView.value = table;
  let view = "table";
  if (!table) view = "card";

  router.replace({
    query: {
      ...route.query,
      view: view,
    },
  });
};

const tableBody = computed(() => {
  return getUsers.value.map(
    (user: {
      image: string;
      firstname: string;
      lastname: string;
      email: string;
      roles: string;
      id: string;
    }) => ({
      image: `<img src="${user.image}" class="max-h-8 max-w-8 rounded-full object-cover"/>`,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      role: user.roles[0],
      linkTo: `/organization/users/${user.id}`,
    })
  );
});

const cardBody = computed(() => {
  return getUsers.value.map(
    (user: {
      image: string;
      firstname: string;
      lastname: string;
      email: string;
      roles: string;
      id: string;
      emailVerified: string;
    }) => ({
      image: `<img src="${user.image}" class="max-h-12 max-w-12 rounded-full object-cover"/>`,
      name: `<h3 class="text-lg font-semibold">${user.firstname}, ${user.lastname}</h3>`,
      email: `<span class="text-gray-500 text-sm">${user.email}</span>`,
      emailVerified: `<span class="text-gray-500 text-sm">${
        user.emailVerified ?? "Pending"
      }</span>`,
      role: `<span class="text-gray-500 text-sm">${user.roles[0]}</span>`,
      linkTo: `/organization/users/${user.id}`,
    })
  );
});

const onNew = () => {
  router.push({ path: "/organization/users/new" });
};
</script>
