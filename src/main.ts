import { createApp, h } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import router from "./router";
import singleSpaVue from "single-spa-vue";
import floatingVue from "floating-vue";
import Toast from "vue-toastification";
import PrimeVue from "primevue/config";
import Aura from "@primevue/themes/aura";

const toastOptions = {
  // You can set your default options here
};

const primeVueOptions = {
  theme: {
    preset: Aura,
    options: {
      prefix: "ui_org",
      darkModeSelector: "system",
      cssLayer: false,
    },
  },
  semantic: {
    primary: {
      50: "{indigo.50}",
      100: "{indigo.100}",
      200: "{indigo.200}",
      300: "{indigo.300}",
      400: "{indigo.400}",
      500: "{indigo.500}",
      600: "{indigo.600}",
      700: "{indigo.700}",
      800: "{indigo.800}",
      900: "{indigo.900}",
      950: "{indigo.950}",
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
