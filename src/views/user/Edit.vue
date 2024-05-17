<template>
  <h1 class="text-2xl font-semibold">User</h1>
  <Back class="mt-3"></Back>
  <div class="mt-5 max-w-7xl mx-auto">
    <p class="mb-5 text-sm text-gray-500">Asterisk(*) is required fields.</p>
    <Form :form="form" :submit="onFormUpdate" :submitText="'Update'"></Form>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, watch } from "vue";
import Form from "../../components/form/Form.vue";
import Back from "../../components/Back.vue";
import formUtil from "../../utils/form.js";
import { useRoute } from "vue-router";
import services from "../../services";
import { useOrganizationStore } from "../../stores/organization";
import { storeToRefs } from "pinia";

const organizationStore = useOrganizationStore();
const { getUser } = storeToRefs(organizationStore);
const route = useRoute();

let form = reactive(
  new formUtil({
    firstname: {
      label: "Firstname*",
      value: "",
      type: "text",
    },
    email: {
      label: "Email*",
      value: "",
      type: "email",
    },
    role: {
      label: "Role and Permission*",
      value: "",
      type: "radio",
      options: [
        { value: "manager", label: "Manager" },
        { value: "member", label: "Member" },
      ],
    },
    accessOrganization: {
      label: "Access Organization",
      value: "",
      type: "checkbox",
      visible: false,
    },
    accessCustomer: {
      label: "Access Customer",
      value: "",
      type: "checkbox",
      visible: false,
    },
    accessProduct: {
      label: "Access Product",
      value: "",
      type: "checkbox",
      visible: false,
    },
  })
);

onMounted(async () => {
  const id = route.params.id.toString();
  await services.showUser(parseInt(id));
  console.log(getUser.value);
  const data = {
    firstname: getUser.value.firstname,
    email: getUser.value.email,
    role: getUser.value.roles[0],
  };
  form.setFormData(data);
});

watch(form, (form) => {
  if (form.getFieldValue("role") == "member") {
    form.setVisible("accessOrganization", true);
    form.setVisible("accessCustomer", true);
    form.setVisible("accessProduct", true);
  } else {
    form.setVisible("accessOrganization", false);
    form.setVisible("accessCustomer", false);
    form.setVisible("accessProduct", false);
  }
});

const onFormUpdate = async () => {
  //
};
</script>
