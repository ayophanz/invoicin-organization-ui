<template>
  <div class="max-w-7xl mx-auto">
    <h1 class="mb-5 text-2xl font-semibold">Profile</h1>
    <p class="mb-5 text-sm text-gray-500">Asterisk(*) is required fields.</p>
    <Form :form="form" :submit="onFormSave"></Form>
  </div>
</template>
<script setup lang="ts">
import { onMounted, reactive } from "vue";
import Form from "../components/form/Form.vue";
import services from "../services";
import { useToast } from "vue-toastification";
import { useOrganizationStore } from "../stores/organization";
import { storeToRefs } from "pinia";
import formUtil from "../utils/form.js";
import globalEvent from "../globalEvent";

const organizationStore = useOrganizationStore();
const { getProfile, getMe } = storeToRefs(organizationStore);
const toast = useToast();

let form = reactive(
  new formUtil({
    logo: {
      label: "Company logo",
      value: null,
      type: "file",
    },
    name: {
      label: "Company name*",
      value: "",
      type: "text",
    },
    email: {
      label: "Company email*",
      value: "",
      type: "email",
    },
  })
);

onMounted(() => {
  show();
});

const show = async () => {
  await services.showProfile();
  const data = {
    name: getProfile.value.name,
    email: getProfile.value.email,
    logo: getProfile.value.logo,
  };

  form.setFormData(data);
};

const onFormSave = async () => {
  form.setErrors({});
  form.setLoading(true);
  await services
    .updateProfile(form.getFormData())
    .then(async () => {
      form.setLoading(false);
      toast.success("Successfully!", {
        timeout: 2000,
      });
      await services.showProfile();
      globalEvent.dispatch.nav.logo(getProfile.value.logo);
    })
    .catch((error) => {
      form.setErrors(error);
      form.setLoading(false);
      toast.error("Something went wrong!", {
        timeout: 2000,
      });
    });
};
</script>
