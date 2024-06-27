<template>
  <div class="max-w-7xl mx-auto">
    <h1 class="mb-5 text-2xl font-semibold">
      Users{{ status != "" ? " - " + status : "" }}
    </h1>
    <div class="flex justify-between items-center my-2">
      <div class="flex justify-center items-center gap-x-2">
        <ViewTypeComponent
          :onView="onView"
          :view="viewType"
        ></ViewTypeComponent>
        <FormComponent :form="filterForm" class="filter-form"></FormComponent>
        <SortingComponent
          :sorts="sorts"
          @onchange-data="onSort"
        ></SortingComponent>
      </div>
      <div>
        <ButtonComponent @click="onNew">
          <PlusIcon class="h-auto w-4"></PlusIcon
          ><span>New</span></ButtonComponent
        >
      </div>
    </div>
    <div
      v-if="!isPermissionHide"
      class="border border-gray-200 rounded-lg p-4 relative mt-4"
    >
      <span class="absolute -top-3 left-0 bg-white px-1">Permission</span>
      <FormComponent
        :form="permissionForm"
        class="permission-form flex justify-start items-center"
      ></FormComponent>
    </div>
    <div class="mt-5">
      <TableListComponent
        v-if="viewType == 'table'"
        :head="tableHead"
        :body="tableBody"
        :clickableRow="true"
      ></TableListComponent>
      <CardListComponent
        v-else
        :label="cardLabel"
        :body="cardBody"
      ></CardListComponent>
      <div v-if="getPagination" class="mt-5">
        <PaginationComponent
          :paginate="getPagination"
          :loading="loading"
          @onchange-page="changePage"
        ></PaginationComponent>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch, computed, ref, reactive, nextTick } from "vue";
import {
  PlusIcon,
  BarsArrowDownIcon,
  BarsArrowUpIcon,
} from "@heroicons/vue/24/outline";
import TableListComponent from "../../components/TableListComponent.vue";
import CardListComponent from "../../components/CardListComponent.vue";
import ButtonComponent from "../../components/ButtonComponent.vue";
import PaginationComponent from "../../components/PaginationComponent.vue";
import ViewTypeComponent from "../../components/ViewTypeComponent.vue";
import services from "../../services";
import { useOrganizationStore } from "../../stores/organization";
import { storeToRefs } from "pinia";
import { useRoute, useRouter } from "vue-router";
import formUtil from "../../utils/form";
import FormComponent from "../../components/form/FormComponent.vue";
import SortingComponent from "../../components/SortingComponent.vue";

const route = useRoute();
const router = useRouter();
const organizationStore = useOrganizationStore();
const { getCurrentRole, getUsers, getPagination } =
  storeToRefs(organizationStore);

const tableHead = ["ID", "Image", "First Name", "Last Name", "Email", "Role"];
const cardLabel = ["", "", "ID", "Email", "Verified", "Role"];
const sorts = [
  {
    id: "asc_id",
    name: "ASC by ID",
    icon: BarsArrowDownIcon,
  },
  {
    id: "desc_id",
    name: "DESC by ID",
    icon: BarsArrowUpIcon,
  },
  {
    id: "asc_firstname",
    name: "ASC by Firstname",
    icon: BarsArrowDownIcon,
  },
  {
    id: "desc_firstname",
    name: "DESC by Firstname",
    icon: BarsArrowUpIcon,
  },
  {
    id: "asc_lastname",
    name: "ASC by Lastname",
    icon: BarsArrowDownIcon,
  },
  {
    id: "desc_lastname",
    name: "DESC by lastname",
    icon: BarsArrowUpIcon,
  },
];
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
  forManager();
  urlChange();
});

watch(route, () => {
  forManager();
  urlChange();
});

const forManager = () => {
  if (getCurrentRole.value == "manager") {
    filterForm.setOptions("role", [{ id: "member", name: "Member" }]);
    nextTick(() => {
      filterForm.setFormData({ role: "member" });
    });
  }
};

const assignData = () => {
  filterForm.setFormData({
    search: route.query.search ?? "",
    role: route.query.role ?? "",
  });

  permissionForm.setFormData({
    accessOrganization: route.query.access_organization ?? "",
    accessProduct: route.query.access_product ?? "",
    accessCustomer: route.query.access_customer ?? "",
  });
};

const urlChange = async () => {
  viewType.value = route.query.view ? route.query.view.toString() : "table";
  assignData();

  let params = window.location.search;
  if (route.path == "/organization/users/pending") {
    params += params == "" ? "?verify=pending" : "&verify=pending";
  } else if (route.path == "/organization/users/verified") {
    params += params == "" ? "?verify=verified" : "&verify=verified";
  }

  loading.value = true;
  await services.users(params);
  setTimeout(function () {
    loading.value = false;
  }, 2000);
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

  let query = { ...route.query };
  if (role != "") query.role = role;
  else delete query.role;

  if (search != "") query.search = search;
  else delete query.search;

  if (role != "member") {
    delete query.access_organization;
    delete query.access_product;
    delete query.access_customer;
    permissionForm.setFormData({
      accessOrganization: "",
      accessProduct: "",
      accessCustomer: "",
    });
  }

  router.replace({
    query: query,
  });

  hidePermission(role);
});

watch(permissionForm, async (form) => {
  if (route.query.role && route.query.role == "member") {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // 1 sec
    const org = form.getFieldValue("accessOrganization").toString();
    const product = form.getFieldValue("accessProduct").toString();
    const customer = form.getFieldValue("accessCustomer").toString();

    let query = { ...route.query };
    if (org == "true") query.access_organization = "true";
    else delete query.access_organization;

    if (product == "true") query.access_product = "true";
    else delete query.access_product;

    if (customer == "true") query.access_customer = "true";
    else delete query.access_customer;

    router.replace({
      query: query,
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

const onSort = (sort: string) => {
  router.replace({
    query: {
      ...route.query,
      sort: sort,
    },
  });
};

const status = computed(() => {
  // if (route.query.sort) {
  //   const verify = route.query.sort.toString();
  //   const capitalized = verify.charAt(0).toUpperCase() + verify.slice(1);

  //   return capitalized;
  // }

  return "";
});

const tableBody = computed(() => {
  return getUsers.value.map((user) => ({
    id: user.prettyId,
    profileImage: {
      image: user.image ? user.image[0] : "",
      defaultImage: user.defaultImage,
    },
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    role: user.role[0],
    linkTo: `/organization/users/${user.id}`,
  }));
});

const cardBody = computed(() => {
  return getUsers.value.map((user) => ({
    profileImage: {
      image: user.image ? user.image[0] : "",
      defaultImage: user.defaultImage,
    },
    name: `<h3 class="text-lg font-semibold">${user.firstname}, ${user.lastname}</h3>`,
    id: user.prettyId,
    email: `<span class="text-gray-500 text-sm">${user.email}</span>`,
    emailVerified: `<span class="text-gray-500 text-sm">${
      user.emailVerified ?? "Pending"
    }</span>`,
    role: `<span class="text-gray-500 text-sm">${user.role[0]}</span>`,
    linkTo: `/organization/users/${user.id}`,
  }));
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
.permission-form .mb-2 {
  margin: 0px;
}
</style>
