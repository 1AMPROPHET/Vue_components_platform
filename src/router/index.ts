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
      children: [
        {
          path: "three",
          name: "three",
          component: () => import("@/pages/testPage/threeTest.vue"),
        },
        {
          path: "page",
          name: "page",
          component: () => import("@/pages/testPage/pageTest.vue"),
        },
      ],
    },
  ],
});

export default router;
