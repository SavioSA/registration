import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "user-list",
      component: () => import("../views/UserListView.vue"),
    },
  ],
});

export default router;
