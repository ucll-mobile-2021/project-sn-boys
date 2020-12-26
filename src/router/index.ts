import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import Tabs from "../views/Tabs.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/tabs/appointments",
  },
  {
    path: "/tabs/",
    component: Tabs,
    children: [
      {
        path: "",
        redirect: "/tabs/appointments",
      },
      {
        path: "appointments",
        component: () => import("@/views/Appointments.vue"),
        children: [
          {
            path: "add",
            component: () => import("@/views/Add.vue"),
          },
          {
            path: "/update/:appointmentId",
            name: 'update',
            component: () => import("@/views/Update.vue"),
          },
          {
            path: "/show/:appointmentId",
            name: 'show',
            component: () => import("@/views/Show.vue")
          }
        ],
      },
      {
        path: "Calendar",
        component: () => import("@/views/Calendar.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
