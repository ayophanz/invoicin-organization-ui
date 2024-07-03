import { createApp, h } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import router from "./router";
import singleSpaVue from "single-spa-vue";
import floatingVue from "floating-vue";
import Toast from "vue-toastification";
import PrimeVue from "primevue/config";
import "primeicons/primeicons.css";
import { definePreset } from "@primevue/themes";
import Nora from "@primevue/themes/nora";

const toastOptions = {
  // You can set your default options here
};

const UIPreset = definePreset(Nora, {
  semantic: {
    primary: {
      50: "{sky.50}",
      100: "{sky.100}",
      200: "{sky.200}",
      300: "{sky.300}",
      400: "{sky.400}",
      500: "{sky.500}",
      600: "{sky.600}",
      700: "{sky.700}",
      800: "{sky.800}",
      900: "{sky.900}",
      950: "{sky.950}",
    },
  },
});

const primeVueOptions = {
  theme: {
    preset: UIPreset,
    options: {
      prefix: "UIOrg",
      darkModeSelector: "system",
      cssLayer: false,
    },
  },
};

const pinia = createPinia();
const vueLifecycles = singleSpaVue({
  createApp,
  appOptions: {
    render() {
      return h(App, {
        props: {
          // single-spa props are available on the "this" object. Forward them to your component as needed.
          // https://single-spa.js.org/docs/building-applications#lifecyle-props
          name: this.name,
        },
      });
    },
  },
  handleInstance: (app) => {
    app.use(pinia);
    app.use(router);
    app.use(floatingVue);
    app.use(Toast, toastOptions);
    app.use(PrimeVue, primeVueOptions);
  },
});

export const { bootstrap } = vueLifecycles;
export const { mount } = vueLifecycles;
export const { unmount } = vueLifecycles;
