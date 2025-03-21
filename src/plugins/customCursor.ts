import CustomCursor from "@/components/customCursor/index.vue";
import { createApp } from "vue";

export default {
  install(app: any) {
    const mountPoint = document.createElement("div");
    document.body.appendChild(mountPoint);

    app.component("CustomCursor", CustomCursor);
    createApp(CustomCursor).mount(mountPoint);
  },
};
