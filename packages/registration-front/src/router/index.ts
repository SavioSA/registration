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
      name: "users-list",
      component: () => import("../views/UserListView.vue"),
    },
    {
      path: "/users/:id",
      name: "user-edit",
      props: true,
      component: () => import("../views/UserEditView.vue"),
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
