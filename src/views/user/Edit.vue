<template>
  <h1 class="text-2xl font-semibold">User</h1>
  <div class="mt-5 max-w-7xl mx-auto">
    <p class="mb-5 text-sm text-gray-500">Asterisk(*) is required fields.</p>
    <Form :form="form" :submit="onFormUpdate" :submitText="'Update'"></Form>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from "vue";
import Form from "../../components/form/Form.vue";
import formUtil from "../../utils/form.js";
import { useRoute } from "vue-router";

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

onMounted(() => {
  console.log(route.params.id);
});

const onFormUpdate = async () => {
  //
};
</script>
