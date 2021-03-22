import Vue from "vue";
import VueRouter from "vue-router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

import { isLogin } from "../utils/auth";

Vue.use(VueRouter);

const routes = [
  {
    path: "/user",
    component: () =>
      import(/* webpackChunkName: "layout" */ "../layouts/UserLayout"),
    children: [
      {
        path: "/user",
        redirect: "/user/login",
      },
      {
        path: "/user/login",
        name: "login",
        component: () =>
          import(/* webpackChunkName: "user" */ "../views/User/Login"),
      },
      {
        path: "/user/register",
        name: "register",
        component: () =>
          import(/* webpackChunkName: "user" */ "../views/User/Register"),
      },
    ],
  },
  {
    path: "/",
    // meta: { authority: ["user"] },
    component: () =>
      import(/* webpackChunkName: "layout" */ "../layouts/BasicLayout"),
    children: [
      {
        path: "/",
        redirect: "/dashboard/receipt_list",
      },
      {
        path: "/dashboard",
        name: "dashboard",
        meta: { icon: "dashboard", title: "receipt management" },
        component: { render: (h) => h("router-view") },
        children: [
          {
            path: "/dashboard/receipt_list",
            name: "display",
            meta: { title: "display receipt" },
            component: () =>
              import(
                /* webpackChunkName: "dashboard" */ "../views/Dashboard/ReceiptList"
              ),
          },
          {
            path: "/dashboard/receipt_chart",
            name: "analysis",
            meta: { title: "analysis receipt" },
            component: () =>
              import(
                /* webpackChunkName: "dashboard" */ "../views/Dashboard/ReceiptChart"
              ),
          },
        ],
      },
    ],
  },
];

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(async (to, from, next) => {
  const is_login = await isLogin();
  if (to.path !== from.path) {
    NProgress.start();
  }
  if (!is_login && to.path !== "/user/login" && to.path !== "/user/register") {
    console.log("not login", is_login);
    next({ path: "/user/login" });
    NProgress.done();
  } else {
    console.log("login", is_login);
    next();
  }
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
