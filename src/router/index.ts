import { createWebHistory, createRouter } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/home",
    },
    {
      path: "/home",
      name: "home",
      component: () => import("@/pages/home/index.vue"),
    },
    {
      path: "/test",
      name: "test",
      component: () => import("@/pages/testPage/index.vue"),
    },
  ],
});

export default router;
