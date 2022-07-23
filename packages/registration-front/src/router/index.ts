import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/users",
    },
    {
      path: "/users",
      name: "user-list",
      component: () => import("../views/UserListView.vue"),
    },
    {
      path: "/:catchAll(.*)",
      redirect: "/users",
    },
  ],
});

export default router;
