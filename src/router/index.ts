import { createMemoryHistory, createRouter } from "vue-router";

export default createRouter({
  history: createMemoryHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "homePage",
      component: () => import("@/pages/HelloWorld.vue"),
    },
    {
      path: "/test",
      name: "testPage",
      component: () => import("@/pages/testPage/index.vue"),
    },
  ],
});
