<template>
  <div class="max-w-7xl mx-auto">
    <h1 class="mb-5 text-2xl font-semibold">Invite Person</h1>
    <p class="mb-5 text-sm text-gray-500">Asterisk(*) is required fields.</p>
    <Form
      :form="form"
      :submit="onFormSave"
      :submitText="'Send Invitation'"
    ></Form>
  </div>
</template>

<script setup lang="ts">
import { reactive, watch } from "vue";
import Form from "../../components/form/Form.vue";
import formUtil from "../../utils/form.js";
import services from "../../services";
import { useToast } from "vue-toastification";

const toast = useToast();

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

const onFormSave = async () => {
  form.setLoading(true);
  form.setErrors({});
  await services
    .storeUser(form.getFormData())
    .then(() => {
      form.reset();
      form.setLoading(false);
      toast.success("Successfully!", {
        timeout: 2000,
      });
    })
    .catch((error) => {
      form.setLoading(false);
      form.setErrors(error);
      toast.error("Something went wrong!", {
        timeout: 2000,
      });
    });
};
</script>
