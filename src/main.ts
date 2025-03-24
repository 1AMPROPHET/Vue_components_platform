import { createApp } from "vue";
import App from "./App.vue";
import ArcoVue from "@arco-design/web-vue";
import router from "./router";
import CustomCursorPlugin from "@/plugins/customCursor";
import i18n from "./i18n";
import pinia from "./store";
import "virtual:uno.css";
import "./style.css";
import "@arco-design/web-vue/dist/arco.css";

const app = createApp(App);
app
  .use(ArcoVue)
  .use(router)
  .use(CustomCursorPlugin)
  .use(i18n)
  .use(pinia)
  .mount("#app");
