<template>
  <div class="max-w-7xl mx-auto">
    <h1 class="mb-5 text-2xl font-semibold">
      Users{{ sort != "" ? " - " + sort : "" }}
    </h1>
    <div class="flex justify-between items-center my-2">
      <div class="flex justify-center items-center gap-x-2">
        <ViewType :onView="onView" :view="viewType"></ViewType>
        <Form :form="filterForm" class="filter-form"></Form>
      </div>
      <div>
        <Button @click="onNew">
          <PlusIcon class="h-auto w-4"></PlusIcon><span>New</span></Button
        >
      </div>
    </div>
    <div
      v-if="!isPermissionHide"
      class="border border-gray-200 rounded-lg p-4 relative mt-4"
    >
      <span class="absolute -top-3 left-0 bg-white px-1">Permission</span>
      <Form
        :form="permissionForm"
        class="permission-form flex justify-start items-center"
      ></Form>
    </div>
    <div class="mt-5">
      <TableList
        v-if="viewType == 'table'"
        :head="tableHead"
        :body="tableBody"
        :clickableRow="true"
      ></TableList>
      <CardList v-else :label="cardLabel" :body="cardBody"></CardList>
      <div v-if="getPagination" class="mt-5">
        <Pagination
          :paginate="getPagination"
          :loading="loading"
          @onchange-page="changePage"
        ></Pagination>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch, computed, ref, reactive } from "vue";
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
import formUtil from "../../utils/form";
import Form from "../../components/form/Form.vue";

const route = useRoute();
const router = useRouter();
const organizationStore = useOrganizationStore();
const { getUsers, getPagination } = storeToRefs(organizationStore);

const tableHead = ["Image", "First Name", "Last Name", "Email", "Role"];
const cardLabel = ["", "", "Email", "Verified", "Role"];
const viewType = ref("table");
const loading = ref(false);
const isPermissionHide = ref(true);
let filterForm = reactive(
  new formUtil({
    role: {
      label: "",
      value: "",
      type: "select",
      options: [
        { id: "", name: "" },
        { id: "manager", name: "Manager" },
        { id: "member", name: "Member" },
      ],
    },
    search: {
      label: "",
      value: "",
      type: "text",
      placeholder: "Search",
    },
  })
);
let permissionForm = reactive(
  new formUtil({
    accessOrganization: {
      label: "Access Organization",
      value: "",
      type: "checkbox",
    },
    accessCustomer: {
      label: "Access Customer",
      value: "",
      type: "checkbox",
    },
    accessProduct: {
      label: "Access Product",
      value: "",
      type: "checkbox",
    },
  })
);

onMounted(() => {
  urlChange();
});

watch(route, () => {
  urlChange();
});

const assignData = () => {
  const data = {
    search: route.query.search ?? "",
    role: route.query.role ?? "",
  };
  filterForm.setFormData(data);
};

const urlChange = async () => {
  viewType.value = route.query.view ? route.query.view.toString() : "table";
  assignData();

  loading.value = true;
  await services
    .users(window.location.search)
    .then(() => {
      setTimeout(function () {
        loading.value = false;
      }, 2000);
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

watch(filterForm, async (form) => {
  await new Promise((resolve) => setTimeout(resolve, 1000)); // 1 sec
  const role = form.getFieldValue("role");
  const search = form.getFieldValue("search");
  hidePermission(role);
  router.replace({
    query: {
      ...route.query,
      search: search,
      role: role,
    },
  });
});

watch(permissionForm, async (form) => {
  if (!isPermissionHide && route.query.role && route.query.role == "member") {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // 1 sec
    const org = form.getFieldValue("accessOrganization");
    const product = form.getFieldValue("accessProduct");
    const customer = form.getFieldValue("accessCustomer");
    router.replace({
      query: {
        ...route.query,
        permissions: [org, product, customer],
      },
    });
  }
});

const hidePermission = (role: string) => {
  if (role == "member") {
    isPermissionHide.value = false;
  } else {
    isPermissionHide.value = true;
  }
};

const onView = (view: string) => {
  router.replace({
    query: {
      ...route.query,
      view: view,
    },
  });
};

const sort = computed(() => {
  if (route.query.sort) {
    const sort = route.query.sort.toString();
    const capitalized = sort.charAt(0).toUpperCase() + sort.slice(1);

    return capitalized;
  }

  return "";
});

const tableBody = computed(() => {
  return getUsers.value.map(
    (user: {
      image: string;
      firstname: string;
      lastname: string;
      email: string;
      role: string;
      id: string;
    }) => ({
      image: `<img src="${user.image}" class="max-h-8 max-w-8 rounded-full object-cover"/>`,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      role: user.role[0],
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
      role: string;
      id: string;
      emailVerified: string;
    }) => ({
      image: `<img src="${user.image}" class="max-h-12 max-w-12 rounded-full object-cover"/>`,
      name: `<h3 class="text-lg font-semibold">${user.firstname}, ${user.lastname}</h3>`,
      email: `<span class="text-gray-500 text-sm">${user.email}</span>`,
      emailVerified: `<span class="text-gray-500 text-sm">${
        user.emailVerified ?? "Pending"
      }</span>`,
      role: `<span class="text-gray-500 text-sm">${user.role[0]}</span>`,
      linkTo: `/organization/users/${user.id}`,
    })
  );
});

const onNew = () => {
  router.push({ path: "/organization/users/new" });
};
</script>

<style>
.filter-form .mt-1,
.filter-form .mb-2,
.filter-form .mt-2 {
  margin: 0px;
}
.filter-form {
  display: flex;
  column-gap: 10px;
}
.filter-form.form-component select {
  width: 150px;
}
.permission-form .mb-2 {
  margin: 0px;
}
</style>
