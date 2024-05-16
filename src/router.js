import { createRouter, createWebHistory } from "vue-router";
import DashboardComponent from "./components/DashboardComponent.vue";
import LoginComponent from "./components/LoginComponent.vue";
import Register from "./components/Register.vue";

const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: DashboardComponent,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/login",
    name: "Login",
    component: LoginComponent,
    meta: {
      guest: true,
    },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: {
      guest: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem("vue-auth-token");

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next("/login");
    } else {
      next();
    }
  } else if (to.matched.some((record) => record.meta.guest)) {
    if (isAuthenticated) {
      next("/");
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
