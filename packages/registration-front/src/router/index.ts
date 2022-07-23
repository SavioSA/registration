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
      path: "/users/new",
      name: "user-register",
      component: () => import("../views/UserRegistrationView.vue"),
    },
    {
      path: "/:catchAll(.*)",
      redirect: "/users",
    },
  ],
});

export default router;
