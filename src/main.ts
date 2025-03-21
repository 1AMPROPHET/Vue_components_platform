import { createApp } from "vue";
import App from "./App.vue";
import ArcoVue from "@arco-design/web-vue";
import router from "./router";
import "virtual:uno.css";
import "./style.css";
import "@arco-design/web-vue/dist/arco.css";
import CustomCursorPlugin from "@/plugins/customCursor";

const app = createApp(App);
app.use(ArcoVue).use(router).use(CustomCursorPlugin).mount("#app");
