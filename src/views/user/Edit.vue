<template>
  <h1 class="text-2xl font-semibold">User</h1>
  <Back class="mt-3"></Back>
  <div class="mt-5 max-w-7xl mx-auto">
    <p class="mb-5 text-sm text-gray-500">Asterisk(*) is required fields.</p>
    <Form :form="form"></Form>
    <div class="flex justify-center items-center gap-x-3">
      <div>
        <Button :disabled="form.getLoading()" @click="reSendInvitation">
          <Spinner
            v-if="runActionOn == 'invitation' && form.getLoading()"
          ></Spinner>
          <span>Re-send Invitation</span>
        </Button>
      </div>
      <div>
        <Button :disabled="form.getLoading()" @click="onFormUpdate">
          <Spinner
            v-if="runActionOn == 'update' && form.getLoading()"
          ></Spinner>
          <span>Update</span>
        </Button>
      </div>
      <div>
        <Button
          type="danger"
          :disabled="form.getLoading()"
          @click="onFormDelete"
        >
          <Spinner
            v-if="runActionOn == 'delete' && form.getLoading()"
          ></Spinner>
          <span>Delete</span>
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, watch, ref, createApp, nextTick } from "vue";
import Form from "../../components/form/Form.vue";
import Back from "../../components/Back.vue";
import Button from "../../components/Button.vue";
import formUtil from "../../utils/form.js";
import { CheckBadgeIcon } from "@heroicons/vue/24/outline";
import { useRoute, useRouter } from "vue-router";
import services from "../../services";
import { useOrganizationStore } from "../../stores/organization";
import { storeToRefs } from "pinia";
import { useToast } from "vue-toastification";
import Spinner from "../../components/Spinner.vue";

const toast = useToast();
const organizationStore = useOrganizationStore();
const { getUser } = storeToRefs(organizationStore);
const route = useRoute();
const router = useRouter();

const runActionOn = ref("");
let form = reactive(
  new formUtil({
    notice: {
      label: "Verified",
      value: "",
      type: "message",
    },
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

  // nextTick(() => {
  //   const wrapper = document.createElement("div");
  //   const someComponentInstance = createApp(CheckBadgeIcon);
  //   const mounted = someComponentInstance.mount(wrapper);
  //   console.log(mounted);
  // });

  const data = {
    firstname: getUser.value.firstname,
    email: getUser.value.email,
    role: getUser.value.roles[0],
    notice: `<span class="pl-2 text-sm">${
      getUser.value.emailVerified ?? "Pending"
    }</span>`,
    accessOrganization: findPermission("access_organization"),
    accessCustomer: findPermission("access_customer"),
    accessProduct: findPermission("access_product"),
  };
  form.setFormData(data);
});

const findPermission = (permission: string) => {
  const find = getUser.value.permissions.find(
    (item: { name: string }) => item.name == permission
  );
  return find ? true : false;
};

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
  runActionOn.value = "update";
  form.setLoading(true);
  form.setErrors({});
  const id = route.params.id.toString();
  await services
    .updateUser(parseInt(id), form.getFormData())
    .then(() => {
      form.setLoading(false);
      toast.success("Successfully Save!", {
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

const onFormDelete = async () => {
  runActionOn.value = "delete";
  form.setLoading(true);
  form.setErrors({});
  const id = route.params.id.toString();
  await services
    .destroyUser(parseInt(id))
    .then(() => {
      form.setLoading(false);
      router.back();
      toast.success("Successfully Deleted!", {
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

const reSendInvitation = async () => {
  runActionOn.value = "invitation";
};
</script>
