<template>
  <TransitionRoot
    appear
    :show="props.state"
    as="template"
    name="modal"
    :initialFocus="completeButtonRef"
  >
    <Dialog as="div" @close="false" class="relative z-10 nav-container">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25"></div>
      </TransitionChild>
      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              :class="dialogClass"
              class="relative max-w-5xl transform overflow-hidden rounded-md bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <ButtonComponent
                ref="completeButtonRef"
                @click="closeModal"
                icon="pi pi-times"
                v-show="props.showClose"
              ></ButtonComponent>
              <slot></slot>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
<script setup lang="ts">
/** Imports */
import { ref } from "vue";
import {
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import ButtonComponent from "./ButtonComponent.vue";

/** Process */
const props = defineProps({
  state: {
    type: Boolean,
    required: true,
  },
  onClose: {
    type: Function,
    required: false,
  },
  showClose: {
    type: Boolean,
    required: false,
    default: true,
  },
  dialogClass: {
    type: String,
    required: false,
    default: "w-full",
  },
});

const completeButtonRef = ref(null);

const closeModal = (e: any) => {
  props.onClose?.(e);
};
</script>
