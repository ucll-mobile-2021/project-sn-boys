import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import Tabs from "../views/Tabs.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/tabs/tab1",
  },
  {
    path: "/tabs/",
    component: Tabs,
    children: [
      {
        path: "",
        redirect: "tab1",
      },
      {
        path: "tab1",
        component: () => import("@/views/Tab1.vue"),
        children: [
          {
            path: "account",
            component: () => import("@/views/Account.vue"),
          },
        ],
      },
      {
        path: "todos",
        component: () => import("@/views/Tab2.vue"),
        children: [
          {
            path: "add",
            component: () => import("@/views/Add.vue"),
          },
          {
            path: ":todoId",
            name: 'update',
            component: () => import("@/views/Update.vue"),
          },
        ],
      },
      {
        path: "tab3",
        component: () => import("@/views/Tab3.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
