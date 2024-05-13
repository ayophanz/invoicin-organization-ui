<template>
  <h1 class="text-2xl font-semibold">Users</h1>
  <div class="flex justify-between my-2">
    <div></div>
    <Button @click="onNew">
      <PlusIcon class="h-auto w-4"></PlusIcon><span>New</span></Button
    >
  </div>
  <div class="mt-5">
    <TableList :head="headCol" :body="body"></TableList>
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch, computed } from "vue";
import { PlusIcon } from "@heroicons/vue/outline";
import TableList from "../../components/TableList.vue";
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

onMounted(async () => {
  await services.users(window.location.search);
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
    }) => ({
      image: `<img src="${user.image}" class="h-8 w-8 rounded-full object-cover"/>`,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      role: user.roles[0],
      linkTo: `/organization/users/${user.id}`,
    })
  );
});

const onNew = () => {
  router.push({ path: "/organization/users/new" });
};
</script>
